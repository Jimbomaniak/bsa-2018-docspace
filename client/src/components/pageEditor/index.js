import React, { Component } from 'react'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'
import joditConfig from './joditConfig'
import PropTypes from 'prop-types'
import './pageEditor.css'

// dummy
import logo from 'src/resources/logo.svg'

export default class PageEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: {
        content: this.props.page.content,
        title: this.props.page.title
      }
      //   modals: {

    //   }
    }
  }

 updatePageContent = (value) => {
   this.setState({
     page: {
       ...this.state.page,
       content: value
     }
   })
 }

 updatePageTitle = (value) => {
   this.setState({
     page: {
       ...this.state.page,
       title: value
     }
   })
   console.log(this.state)
 }

 handlePablishClick = () => {

 }

 jodit;

 setRef = jodit => {
   this.jodit = jodit
   return this.jodit
 }

 render () {
   const {space, page, user} = this.props
   return (
     <div className='page-editor-wrp'>
       <div className='page-editor-header'>
         <div className='page-menu'>
           <div className='breadcrumbs'>
             {/* :space_name/pages/:page_name */}
             <span>
               {space.name}
             </span>
             <span>
                / pages
             </span>
             <span>
               {`/ ${page.title}`}
             </span>
           </div>
           <div className='page-settings-btn-wrp'>
             <button data-hover-text-help='page location'>
               <i className='fas fa-sitemap' />
             </button>
             <button data-hover-text-help='labels'>
               <i className='fas fa-tags' />
             </button >
             <button data-hover-text-help='permissions'>
               <i className='fas fa-lock-open' />
             </button>
           </div>
         </div>

         <div className='additional-icons'>
           <span data-hover-text-help='find/replace'>
             <i className='fas fa-search' />
           </span>
           <span data-hover-text-help='help'>
             <i className='fas fa-question' />
           </span>
           <span className='avatar-wrp' data-hover-text-help="It's you!">
             <img className='user-avatar' src={user.avatar} alt='' />
           </span>
           <span data-hover-text-help='invite people for collaborative editing'>
             <i className='fas fa-plus' />
           </span>
         </div>
       </div>

       <input
         type='text'
         placeholder='Enter page header'
         className='page-title-input'
         onChange={({target}) => { this.updatePageTitle(target.value) }}
         defaultValue={this.props.page.title}
       />
       <JoditEditor
         editorRef={this.setRef}
         value={this.state.page.content}
         config={joditConfig}
         onChange={this.updatePageContent}
       />

       <div className='page-editor-footer'>
         <div>
           <button
             className='accept-button'
             onClick={this.handlePablishClick}
           >
              Publish
           </button>
           <button>
              Cancel
           </button>
           <button>
             <i className=' fas fa-ellipsis-h' />
           </button>
         </div>
       </div>
     </div>
   )
 }
}

PageEditor.defaultProps = {
  page: {
    content: '',
    title: ''
  },
  space: {
    name: 'Fake'
  },
  user: {
    avatar: logo
  }
}

PageEditor.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }),

  space: PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.string
  }),
  user: PropTypes.shape({
    avatar: PropTypes.string
  })
}
