import gradio as gr

# Fungsi chat sederhana
def chat(message, history):
    history = history or []

    # Balasan AI (saat ini sederhana)
    reply = "🤖 AI: Kamu baru saja mengetik → " + message

    # Masukkan ke history chat
    history.append((message, reply))
    return history, history

# UI Gradio
with gr.Blocks() as demo:
    gr.Markdown("# 🤖 My AI Chatbot\nChatbot sederhana siap pakai!")

    chatbot = gr.Chatbot()
    msg = gr.Textbox(label="Ketik pesan di sini...")
    clear = gr.Button("Clear")

    msg.submit(chat, [msg, chatbot], [chatbot, chatbot])
    clear.click(lambda: None, None, chatbot)

# Jalankan chatbot
demo.launch()
