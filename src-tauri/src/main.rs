// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::{Client, Method, header::{HeaderMap, HeaderName, HeaderValue}};
use serde::{Deserialize, Serialize};
use std::str::FromStr;
use tauri::State;

#[derive(Debug, Serialize, Deserialize)]
struct RequestConfig {
    method: String,
    url: String,
    headers: Vec<HeaderItem>,
    body: Option<String>,
    body_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct HeaderItem {
    key: String,
    value: String,
}

#[derive(Debug, Serialize)]
struct ResponseData {
    status: u16,
    headers: Vec<HeaderItem>,
    data: String,
    time: u128,
}

struct HttpClient(Client);

#[tauri::command]
async fn send_request(
    client: State<'_, HttpClient>,
    config: RequestConfig,
) -> Result<ResponseData, String> {
    let start_time = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_millis();

    // 构建请求方法
    let method = Method::from_str(&config.method.to_uppercase())
        .map_err(|e| e.to_string())?;

    // 构建请求
    let mut request = client.0.request(method, &config.url);

    // 添加请求头
    let mut headers = HeaderMap::new();
    for header in config.headers {
        if !header.key.is_empty() && !header.value.is_empty() {
            headers.insert(
                HeaderName::from_str(&header.key).map_err(|e| e.to_string())?,
                header.value.parse::<reqwest::header::HeaderValue>().map_err(|e| e.to_string())?,
            );
        }
    }
    request = request.headers(headers);

    // 添加请求体
    if let Some(body) = config.body {
        match config.body_type.as_str() {
            "json" => {
                request = request.header("Content-Type", "application/json");
                request = request.body(body);
            }
            "form-data" => {
                // 处理form-data
                let form_data: serde_json::Value = serde_json::from_str(&body)
                    .map_err(|e| e.to_string())?;
                let mut form = reqwest::multipart::Form::new();
                if let Some(obj) = form_data.as_object() {
                    for (key, value) in obj {
                        form = form.text(key.clone(), value.to_string());
                    }
                }
                request = request.multipart(form);
            }
            _ => {}
        }
    }

    // 发送请求
    let response = request.send().await.map_err(|e| e.to_string())?;
    
    // 处理响应
    let status = response.status().as_u16();
    let headers = response
        .headers()
        .iter()
        .map(|(name, value)| HeaderItem {
            key: name.to_string(),
            value: value.to_str().unwrap_or("").to_string(),
        })
        .collect();
    let data = response.text().await.map_err(|e| e.to_string())?;
    
    let end_time = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_millis();

    Ok(ResponseData {
        status,
        headers,
        data,
        time: end_time - start_time,
    })
}

fn main() {
    run()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
fn run() {
    tauri::Builder::default()
    .manage(HttpClient(Client::new()))
    .invoke_handler(tauri::generate_handler![send_request])
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_clipboard_manager::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_opener::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
