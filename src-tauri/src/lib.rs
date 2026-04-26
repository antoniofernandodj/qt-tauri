// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use rusqlite::{Connection, Result};
use tauri::{AppHandle, Manager};
use tauri::Runtime;
use std::path::PathBuf;


// Função para obter o caminho do banco de dados
fn get_db_path(app: &AppHandle) -> Result<PathBuf, String> {
    let app_data_dir = app.path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    
    std::fs::create_dir_all(&app_data_dir)
        .map_err(|e| e.to_string())?;
    
    Ok(app_data_dir.join("database.db"))
}

// Comando para inserir dados
#[tauri::command]
fn insert(app: AppHandle, v: String, o: String) -> Result<String, String> {
    let db_path = get_db_path(&app)?;
    let conn = Connection::open(&db_path)
        .map_err(|e| e.to_string())?;
    
    conn.execute(
        "INSERT INTO users (name, email) VALUES (?1, ?2)",
        [&v, ""],
    ).map_err(|e| e.to_string())?;
    
    Ok("insert inserted successfully".to_string())
}

#[tauri::command]
async fn command_name<R: Runtime>(
    _app: tauri::AppHandle<R>,
    _window: tauri::Window<R>
) -> Result<(), String> {

    // // Gerenciamento de Estado
    // app.state::<MyState>(); // Acessa estado global
    // app.manage(MyState::new()); // Registra estado global

    // // Caminhos do sistema
    // app.path().app_data_dir()?; // Dados do app
    // app.path().app_config_dir()?; // Configurações
    // app.path().app_cache_dir()?; // Cache
    // app.path().app_log_dir()?; // Logs
    // app.path().resource_dir()?; // Recursos empacotados
    // app.path().temp_dir()?; // Temporário

    // // Gerenciamento de janelas
    // app.get_window("main"); // Pega janela por label
    // app.get_webview_window("main"); // Pega webview window
    // app.windows(); // HashMap de todas as janelas
    // app.webview_windows(); // HashMap de webview windows

    // // Eventos
    // app.emit("event-name", payload)?; // Emite evento global
    // app.emit_to("window-label", "event", payload)?; // Emite para janela específica
    // app.listen("event-name", |event| { }); // Escuta evento

    // // Menu e Tray
    // app.set_menu(menu)?; // Define menu
    // app.remove_menu()?; // Remove menu
    // app.tray_by_id("tray-id"); // Acessa tray icon

    // // Outras utilidades
    // app.config(); // Configuração do Tauri
    // app.package_info(); // Info do package
    // app.app_handle(); // Clone do AppHandle
    // app.exit(0); // Encerra o app
    // app.restart(); // Reinicia o app

    // // Propriedades básicas
    // window.label(); // Nome/ID da janela
    // window.title()?; // Título atual
    // window.is_visible()?; // Se está visível
    // window.is_focused()?; // Se tem foco

    // // Manipulação de janela
    // window.show()?; // Mostra janela
    // window.hide()?; // Esconde janela
    // window.close()?; // Fecha janela
    // window.minimize()?; // Minimiza
    // window.maximize()?; // Maximiza
    // window.unmaximize()?; // Desmaxximiza
    // window.toggle_maximize()?; // Alterna maximizado
    // window.set_focus()?; // Foca janela
    // window.set_fullscreen(true)?; // Fullscreen

    // // Posicionamento e tamanho
    // window.outer_position()?; // Posição (x, y)
    // window.inner_position()?; // Posição interna
    // window.outer_size()?; // Tamanho total
    // window.inner_size()?; // Tamanho área de conteúdo
    // window.set_size(Size::Physical(PhysicalSize { width: 800, height: 600 }))?;
    // window.set_position(Position::Physical(PhysicalPosition { x: 100, y: 100 }))?;
    // window.set_min_size(Some(Size::Physical(...)))?;
    // window.set_max_size(Some(Size::Physical(...)))?;
    // window.center()?; // Centraliza na tela

    // // Título e ícone
    // window.set_title("Novo Título")?;
    // window.set_icon(icon)?;

    // // Decorações
    // window.set_decorations(false)?; // Remove bordas/barra de título
    // window.set_resizable(false)?; // Desabilita redimensionamento
    // window.set_always_on_top(true)?; // Sempre no topo
    // window.set_skip_taskbar(true)?; // Esconde da taskbar

    // // Eventos
    // window.emit("event-name", payload)?; // Emite evento para esta janela
    // window.listen("event-name", |event| { }); // Escuta evento
    // window.once("event-name", |event| { }); // Escuta uma vez

    // // Estado
    // window.state::<MyState>(); // Acessa estado global
    // window.app_handle(); // Pega AppHandle

    // // Webview
    // window.eval("console.log('Hello')")?; // Executa JavaScript
    // window.url()?; // URL atual

    // // Outras
    // window.scale_factor()?; // Fator de escala DPI
    // window.theme()?; // Tema (Dark/Light)
    // window.is_maximized()?;
    // window.is_minimized()?;
    // window.is_decorated()?;
    // window.is_resizable()?;

    Ok(())
}

// #[tauri::command]
// async fn my_command<R: Runtime>(
//     app: tauri::AppHandle<R>,
//     window: tauri::Window<R>
// ) -> Result<(), String> {
//     // Salvar arquivo na pasta de dados do app
//     let data_dir = app.path().app_data_dir()
//         .map_err(|e| e.to_string())?;
    
//     // Acessar estado global
//     let state = app.state::<MyState>();
    
//     // Emitir evento global
//     app.emit("global-event", "data")
//         .map_err(|e| e.to_string())?;
    
//     // Manipular janela atual
//     window.set_title("Processing...")
//         .map_err(|e| e.to_string())?;
//     window.center()
//         .map_err(|e| e.to_string())?;
    
//     // Emitir evento só para esta janela
//     window.emit("window-event", "done")
//         .map_err(|e| e.to_string())?;
    
//     // Criar nova janela
//     tauri::WebviewWindowBuilder::new(
//         &app,
//         "new-window",
//         tauri::WebviewUrl::App("index.html".into())
//     )
//     .title("Nova Janela")
//     .inner_size(800.0, 600.0)
//     .build()
//     .map_err(|e| e.to_string())?;
    
//     Ok(())
// }



fn init_database(app: AppHandle) -> Result<String, String> {
    let db_path = get_db_path(&app)?;

    let conn = Connection::open(&db_path)
        .map_err(|e| e.to_string())?;

    // Cria uma tabela de exemplo
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )",
        [],
    ).map_err(|e| e.to_string())?;
    
    Ok(format!("Database initialized at: {:?}", db_path))
}


// Comando para ler dados
#[tauri::command]
fn get(app: AppHandle) -> Result<Vec<(i32, String, String)>, String> {
    let db_path = get_db_path(&app)?;
    let conn = Connection::open(&db_path)
        .map_err(|e| e.to_string())?;
    
    let mut stmt = conn.prepare("SELECT id, name, email FROM users")
        .map_err(|e| e.to_string())?;
    
    let users = stmt.query_map([], |row| {
        Ok((
            row.get(0)?,
            row.get(1)?,
            String::from(""),
        ))
    })
    .map_err(|e| e.to_string())?
    .collect::<Result<Vec<_>, _>>()
    .map_err(|e| e.to_string())?;
    
    Ok(users)
}



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            // Você pode usar app aqui no setup
            let handle = app.handle().clone();
            if let Ok(result) = init_database(handle.clone()) {
                println!("{}", result);
            } else if let Err(result) = init_database(handle) {
                println!("{}", result);
            }
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            command_name,
            insert,
            get
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
