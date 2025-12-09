import gradio as gr

def chat(message, history):
    # kalau belum ada history, buat list kosong
    history = history or []
    
    # Jawaban AI sederhana
    reply = "Ini adalah AI chatbot buatan kamu! Kamu barusan bilang: " + message
    
    # Masukkan riwayat chat
    history.append((message, reply))
    return history, history


with gr.Blocks() as demo:
    gr.Markdown("# 🤖 My AI Chatbot\nChatbot simple buatan kamu!")

    chatbot = gr.Chatbot()
    msg = gr.Textbox(label="Ketik pesan di sini...")
    clear = gr.Button("Clear")

    msg.submit(chat, [msg, chatbot], [chatbot, chatbot])
    clear.click(lambda: None, None, chatbot)

demo.launch()
