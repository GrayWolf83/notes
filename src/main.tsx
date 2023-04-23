import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '~/app'
import './index.css'

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/serviceWorkers.js')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
)
