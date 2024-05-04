// Angular
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Partials for CRUD
import {

	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
} from '../../crud';
import { ConfirmationDialogComponent } from '../action-confirm/confirmation-dialog.component';
import { ActionNotificationComponent } from '../action-natification/action-notification.component';

export enum MessageType {
	Create,
	Read,
	Update,
	Delete
}

@Injectable()
export class LayoutUtilsService {
	/**
	 * Service constructor
	 *
	 * @param snackBar: MatSnackBar
	 * @param dialog: MatDialog
	 */
	constructor(private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private modalService: NgbModal,) { }

	/**
	 * Showing (Mat-Snackbar) Notification
	 *
	 * @param message: string
	 * @param type: MessageType
	 * @param duration: number
	 * @param showCloseButton: boolean
	 * @param showUndoButton: boolean
	 * @param undoButtonDuration: number
	 * @param verticalPosition: 'top' | 'bottom' = 'top'
	 *  * @param horizontalPosition: 'start' | 'start' = 'start'
	 *

	 */
	showActionNotification(
		_message: string,
		_type: MessageType = MessageType.Create,
		_duration: number = 10000,
		_showCloseButton: boolean = true,
		_showUndoButton: boolean = true,
		_undoButtonDuration: number = 3000,
		_verticalPosition: 'top' | 'bottom' = 'top',
		mean: 0 | 1 | 2 = 1


	) {
		const _data = {
			message: _message,
			snackBar: this.snackBar,
			showCloseButton: _showCloseButton,
			showUndoButton: _showUndoButton,
			undoButtonDuration: _undoButtonDuration,
			verticalPosition: _verticalPosition,
			type: _type,
			action: 'Undo',
			meanMes: mean
		};
		return this.snackBar.openFromComponent(ActionNotificationComponent, {
			duration: _duration,
			data: _data,
			verticalPosition: _verticalPosition
		});
	}

	showInfo(
		message: string,
	) {
		let type: MessageType = MessageType.Create,
			duration: number = 100000,
			showCloseButton: boolean = true,
			showUndoButton: boolean = false,
			undoButtonDuration: number = 3000,
			verticalPosition: 'top' | 'bottom' = 'top',
			mean: 0 | 1 = 1
		return this.snackBar.openFromComponent(ActionNotificationComponent, {
			duration: duration,
			data: {
				message,
				snackBar: this.snackBar,
				showCloseButton: showCloseButton,
				showUndoButton: showUndoButton,
				undoButtonDuration,
				verticalPosition,
				type,
				action: 'Undo',
				meanMes: mean
			},
			verticalPosition: verticalPosition
		});
	}


	Notifi(
		_message: string,
		_fullname: string,
		_avatar: string,
		_type: MessageType = MessageType.Create,
		_duration: number = 10000,
		_showCloseButton: boolean = true,
		_showUndoButton: boolean = true,
		_undoButtonDuration: number = 3000,
		_verticalPosition: 'top' | 'bottom' = 'bottom',
		horizontalPosition: 'start' = 'start',
		mean: 0 | 1 = 1
	) {
		const _data = {
			message: _message,
			Fullname: _fullname,
			avatar: _avatar,
			snackBar: this.snackBar,
			showCloseButton: _showCloseButton,
			showUndoButton: _showUndoButton,
			undoButtonDuration: _undoButtonDuration,
			verticalPosition: _verticalPosition,
			horizontalPosition: horizontalPosition,
			type: _type,
			action: 'Undo',
			meanMes: mean
		};
		return this.snackBar.openFromComponent(FetchEntityDialogComponent, {
			duration: _duration,
			data: _data,
			verticalPosition: _verticalPosition,
			horizontalPosition: horizontalPosition
		});
	}
	/**
	 * Showing Confirmation (Mat-Dialog) before Entity Removing
	 *
	 * @param title: stirng
	 * @param description: stirng
	 * @param waitDesciption: string
	 */
	deleteElement(title: string = '', description: string = '', waitDesciption: string = '', doPositiveBtn: string = 'Delete', isDel: boolean = true) {
		return this.dialog.open(DeleteEntityDialogComponent, {
			data: { title, description, waitDesciption, doPositiveBtn, isDel },
			width: '440px',
			panelClass: 'no-padding'
		});
	}

	/**
	 * Showing Fetching Window(Mat-Dialog)
	 *
	 * @param _data: any
	 */
	fetchElements(_data: any) {
		return this.dialog.open(FetchEntityDialogComponent, {
			data: _data,
			width: '400px'
		});
	}

	/**
	 * Showing Update Status for Entites Window
	 *
	 * @param title: string
	 * @param statuses: string[]
	 * @param messages: string[]
	 */












	public confirm(
		title: string,
		message: string,
		btnOkText: string = 'Hủy thay đổi và đóng',
		// btnCancelText: string = 'Đóng',
		btnSaveChange: string = 'Lưu thay đổi và đóng',
		dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: '280px' });
		modalRef.componentInstance.title = title;
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.btnOkText = btnOkText;
		// modalRef.componentInstance.btnCancelText = btnCancelText;
		modalRef.componentInstance.btnSaveChange = btnSaveChange;
		return modalRef.result;
	}

	showError(
		message: string,
	) {
		let type: MessageType = MessageType.Read,
			duration: number = 100000,
			showCloseButton: boolean = true,
			showUndoButton: boolean = false,
			undoButtonDuration: number = 3000,
			verticalPosition: 'top' | 'bottom' = 'top',
			mean: 0 | 1 = 0
		return this.snackBar.openFromComponent(ActionNotificationComponent, {
			duration: duration,
			data: {
				message,
				snackBar: this.snackBar,
				showCloseButton: showCloseButton,
				showUndoButton: showUndoButton,
				undoButtonDuration,
				verticalPosition,
				type,
				action: 'Undo',
				meanMes: mean
			},
			verticalPosition: verticalPosition
		});
	}
}
