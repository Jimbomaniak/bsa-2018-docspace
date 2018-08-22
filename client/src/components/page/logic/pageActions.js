import * as actionTypes from './pageActionTypes'

// GET
export const getPagesRequest = () => ({
  type: actionTypes.GET_ALL_PAGES_REQUEST
})

export const allPagesFetchedAndNormalized = (all, byId) => ({
  type: actionTypes.GET_ALL_PAGES_SUCCESS,
  payload: {
    all: all,
    byId: byId
  }
})

export const getAllPagesError = () => ({
  type: actionTypes.GET_ALL_PAGES_ERROR
})

// GET ONE
export const getPageByIdRequest = (id) => ({
  type: actionTypes.GET_PAGE_BY_ID_REQUEST,
  payload: id
})

export const getPageByIdSuccess = (page) => ({
  type: actionTypes.GET_PAGE_BY_ID_SUCCESS,
  payload: page
})

export const getPageByIdError = () => ({
  type: actionTypes.GET_PAGE_BY_ID_ERROR
})

// POST
export const createPageRequest = (page) => ({
  type: actionTypes.CREATE_PAGE_REQUEST,
  payload: page
})

export const createPageSuccess = (page) => ({
  type: actionTypes.CREATE_PAGE_SUCCESS,
  payload: page
})

export const createBlogPageRequest = (page, spaceId) => ({
  type: actionTypes.CREATE_BLOG_PAGE_REQUEST,
  payload: page,
  // This field we need for redirect to '/spaces/:space_id/blog/:page_id'
  // If we create blog page outside of some space ( at app root, for example),
  // we can't get spaceId. From server we receive page without spaceId. just blogId.
  // So, I suggest pass spaceId directly with action to target saga. In this way, we can redirect to target path
  spaceId
})

export const createBlogPageSuccess = (blogPage) => ({
  type: actionTypes.CREATE_BLOG_PAGE_SUCCESS,
  payload: blogPage
})

export const createPageError = () => ({
  type: actionTypes.CREATE_PAGE_ERROR
})

// UPDATE
export const updatePageRequest = (newPage) => ({
  type: actionTypes.UPDATE_PAGE_REQUEST,
  payload: newPage
})

export const updatePageSuccess = (updatedPage) => {
  const pageWithCorrectCommentTime = updatedPage

  pageWithCorrectCommentTime.commentsArr = updatedPage.commentsArr.map((comment) => {
    comment.createdAt = new Date(comment.createdAt)

    return comment
  })

  return {
    type: actionTypes.UPDATE_PAGE_SUCCESS,
    payload: pageWithCorrectCommentTime
  }
}

export const updateBlogPageRequest = (newPage) => ({
  type: actionTypes.UPDATE_BLOG_PAGE_REQUEST,
  payload: newPage
})

export const updateBlogPageSuccess = (updatedPage) => ({
  type: actionTypes.UPDATE_BLOG_PAGE_SUCCESS,
  payload: updatedPage
})

export const updatePageError = () => ({
  type: actionTypes.UPDATE_PAGE_ERROR
})

// DELETE
export const deletePageRequest = (page) => ({
  type: actionTypes.DELETE_PAGE_REQUEST,
  payload: { ...page }
})

export const deletePageSuccess = (deletedPage) => ({
  type: actionTypes.DELETE_PAGE_SUCCESS,
  payload: deletedPage
})

export const deleteBlogPageRequest = (page) => ({
  type: actionTypes.DELETE_BLOG_PAGE_REQUEST,
  payload: { ...page }
})

export const deleteBlogPageSuccess = (deletedPage) => ({
  type: actionTypes.DELETE_BLOG_PAGE_SUCCESS,
  payload: deletedPage
})

export const deletePageError = () => ({
  type: actionTypes.DELETE_PAGE_ERROR
})

// CANCEL REQUST INDICATOR
export const cancelPageByIdRequst = () => ({
  type: actionTypes.CANCEL_PAGE_BY_ID_REQUEST
})

// EXPORT
export const exportPageToPdf = (page) => ({
  type: actionTypes.EXPORT_PAGE_TO_PDF,
  payload: page
})

export const exportPageToWord = (page) => ({
  type: actionTypes.EXPORT_PAGE_TO_WORD,
  payload: page
})
