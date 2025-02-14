import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import './App.css'

function App() {

  const url = 'https://aicodereviewer-backend.onrender.com' || 'http://localhost:3000' ;

  const [code, setCode] = useState(`function example() {
  // Write your code here
  return "Hello World!";
}`);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      setLoading(true);
      const response = await axios.post(`${url}/ai/get-review`, { code });
      setReview(response.data);
    } catch (error) {
      setReview('```error\nFailed to review code. Please try again.\n```');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <h1>Code Review AI</h1>
          <p>Get instant, professional code reviews powered by Google Gemini AI.</p>
        </div>
      </header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={20}
              style={{
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                fontSize: 14,
                backgroundColor: 'transparent',
                height: '100%',
                width: '100%'
              }}
            />
          </div>
          <div className="bottom-controls">
            {/* <div className="language-selector">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
            </div> */}
            <button
              onClick={reviewCode}
              disabled={loading}
              className="review">
              {loading ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>
        </div>
        <div className="right">
          <ReactMarkdown className="markdown-content">
            {review || '# Code Review\nYour review will appear here after clicking the Review button.'}
          </ReactMarkdown>
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2024 Code Review AI • Made with ❤️ by Vaibhav Raj Tyagi. • <a href="https://github.com/VaibhavRajTyagi/AiCodeReviewer" target='_blank'>GitHub</a></p>
      </footer>
    </>
  )
}

export default App
