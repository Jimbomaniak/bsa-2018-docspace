import html2pdf from 'html2pdf.js'
import htmlDocx from 'html-docx-js/dist/html-docx'
import fileSaver from 'file-saver'
import { callWebApi } from 'src/helpers/requestHelper'
class PageService {
  getPages = () => {
    const args = { endpoint: '/api/pages', method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  getPage = (id) => {
    const args = { endpoint: `/api/pages/${id}`, method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  createPage = (pageObj) => {
    const args = { endpoint: `/api/pages`, method: 'POST', body: JSON.stringify(pageObj) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  deletePage = (page) => {
    const args = { endpoint: `/api/pages/${page._id}`, method: 'DELETE' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  updatePage = (newPage) => {
    const args = { endpoint: `/api/pages/${newPage._id}`, method: 'PUT', body: JSON.stringify(newPage) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  search = (input) => {
    const args = { endpoint: `/api/pages/search`, method: 'POST', body: JSON.stringify({input}) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }

  async sendDocFile (file) {
    let fd = new FormData()
    fd.append('docfile', file.content)
    fd.append('docfileDescription', JSON.stringify({title: file.title.split('.')[0], spaceId: file.spaceId})) // split extension from name example.docx -> example
    const result = await fetch('/api/uploadFiles/convertWordToHTML', { method: 'POST',
      body: fd })
      .then(res => res.json())
      .catch(err => console.log(err))
    return result
  }

  exportPageToPdf = (page) => {
    const { content, _id } = page
    const options = {
      margin: 1,
      filename: `${_id}.pdf`,
      html2canvas: {
        logging: false
      }
    }

    return html2pdf().from(content).set(options).save()
  }

  exportPageToWord = (page) => {
    const { content, _id } = page
    const html = `<!DOCTYPE html><head></head><body>${content}</body>`
    const converted = htmlDocx.asBlob(html)

    fileSaver.saveAs(converted, `${_id}.docx`)
  }
}
export default new PageService()
