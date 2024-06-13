import webbrowser

def open_chromium():
    url = 'https://garlicresearchcenter.ngrok.app/monitoring'  # Replace 'https://www.example.com' with your specific link
    webbrowser.get('chromium-browser').open(url)

if __name__ == '__main__':
    open_chromium()
