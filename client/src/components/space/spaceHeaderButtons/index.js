import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import DropdownMenu from 'src/components/common/dropdownMenu'
import WatchModal from 'src/components/modals/watchModal'

import './spaceHeaderButtons.css'

class SpaceHeaderButtons extends Component {
  constructor () {
    super()

    this.state = {
      isMenuOpened: false,
      isWatchModalShowed: false
    }
  }

  onMenu = () => {
    this.setState((state) => {
      return {
        isMenuOpened: !state.isMenuOpened
      }
    })
  }

  onWatch = () => {
    this.setState((state) => {
      return {
        isWatchModalShowed: !state.isWatchModalShowed
      }
    })
  }

  render () {
    console.log(this.state)
    console.log(this.props)
    const { onEdit, onShare, onSave, children, type, t, hideEditBtn, openWarningModal, onPdfExport, onWordExport, onWordImport, manageSpaceWatcher, isWatchingSpace, isWatching, manageWatcher } = this.props
    const dropdownMenuItems = [
      {
        name: t('export_to_PDF'),
        onClick: () => onPdfExport()
      },
      {
        name: t('export_to_Word'),
        onClick: () => onWordExport()
      },
      {
        name: t('import_word'),
        onClick: () => onWordImport()
      }
    ]
    return (
      <div className='buttons-container'>
        {
          !hideEditBtn &&
          <div className='buttons-item' title={t('edit')} onClick={onEdit}>
            <i className='fas fa-pen' />
          </div>
        }
        {
          type === 'blog' || type === 'page'
            ? (
              <div className='buttons-item' title={t('save_for_later')} onClick={onSave}>
                <i className='far fa-star' />
              </div>
            )
            : null
        }
        <div className='buttons-item' title={t('watch')}onClick={this.onWatch}>
          <i className='fas fa-eye' />
        </div>
        {this.state.isWatchModalShowed
          ? <WatchModal manageWatcher={manageWatcher}
            isWatchingSpace={isWatchingSpace}
            isWatching={isWatching}
            manageSpaceWatcher={manageSpaceWatcher}
          /> : null}
        <div className='buttons-item' title={t('share_this_page_with_others')} onClick={onShare}>
          <i className='fas fa-share-square' />
        </div>
        <DropdownMenu
          icon='fas fa-ellipsis-h'
          type='buttons-item'
          menuItems={dropdownMenuItems}
        />
        {/* TEMP ADDED FOR DELETING PAGE */}
        {
          type === 'page' &&
          <div className='buttons-item' onClick={openWarningModal} >
            <i className='fas fa-trash' />
          </div>
        }
        {children}
      </div>
    )
  }
}

SpaceHeaderButtons.propTypes = {
  t: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onShare: PropTypes.func,
  onPdfExport: PropTypes.func,
  onWordExport: PropTypes.func,
  onSave: PropTypes.func,
  children: PropTypes.element,
  type: PropTypes.string,
  hideEditBtn: PropTypes.bool,
  openWarningModal: PropTypes.func,
  onWordImport: PropTypes.func,
  isWatching: PropTypes.bool,
  manageWatcher: PropTypes.func,
  isWatchingSpace: PropTypes.bool,
  manageSpaceWatcher: PropTypes.func
}

SpaceHeaderButtons.defaultProps = {
  onEdit: () => false,
  onWatch: () => false,
  onShare: () => false,
  onPdfExport: () => false,
  onWordExport: () => false,
  onSave: () => false,
  onDelete: () => false,
  children: null,
  type: ''
}

export default translate('translations')(SpaceHeaderButtons)
