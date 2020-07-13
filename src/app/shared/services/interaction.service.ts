import { Injectable } from '@angular/core';
import { Plugins, StatusBarStyleOptions } from '@capacitor/core';
import { ActionSheetController, AlertController, LoadingController, ModalController, PickerController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { ActionSheetButton, Color, OverlayEventDetail } from '@ionic/core';
import { isObservable, Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ListResponse } from '../models';

export type IonOverlayTypes = 'alert' | 'actionsheet' | 'loading' | 'modal' | 'picker' | 'popover' | 'toast';

@Injectable({ providedIn: 'root' })
export class InteractionService {

    private loadingDelayTimer: number = 0;

    public constructor(
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController,
        private pickerCtrl: PickerController,
        private platform: Platform,
        private popCtrl: PopoverController,
        private toastCtrl: ToastController,
    ) { }

    public async toast(message: string, { position = 'bottom', duration = 1800, color = '' }: { position?: 'top' | 'bottom' | 'middle'; duration?: number; color?: Color } = {}): Promise<void> {
        if (!message) {
            return;
        }
        let topToast: HTMLIonToastElement | undefined = await this.toastCtrl.getTop();
        if (topToast) {
            await topToast.dismiss();
        }
        let toast: HTMLIonToastElement = await this.toastCtrl.create({
            message,
            duration,
            position,
            color,
        });
        await toast.present();
    }

    public async alert(header: string, { message = '', subHeader = '', buttons = ['确认'] }: { message?: string; subHeader?: string; buttons?: Array<string> } = {}): Promise<void> {
        let topAlert: HTMLIonAlertElement | undefined = await this.alertCtrl.getTop();
        if (topAlert) {
            await topAlert.dismiss();
        }
        const alert: HTMLIonAlertElement = await this.alertCtrl.create({
            header,
            subHeader,
            message,
            buttons,
        });
        await alert.present();
        await alert.onDidDismiss();
    }

    public async confirm(header: string, { message = '' }: { message?: string } = {}): Promise<boolean> {
        let topAlert: HTMLIonAlertElement | undefined = await this.alertCtrl.getTop();
        if (topAlert) {
            await topAlert.dismiss();
        }
        return new Promise<boolean>(async resolve => {
            const confirm: HTMLIonAlertElement = await this.alertCtrl.create({
                header,
                message,
                buttons: [{
                    text: '取消',
                    role: 'cancel',
                    handler: () => resolve(false),
                }, {
                    text: '确认',
                    handler: () => resolve(true),
                }],
            });
            await confirm.present();
        });
    }

    public async prompt(header: string, { value = '', placeholder = '', message = '' }: { value?: string; placeholder?: string; message?: string } = {}): Promise<string> {
        let topAlert: HTMLIonAlertElement | undefined = await this.alertCtrl.getTop();
        if (topAlert) {
            await topAlert.dismiss();
        }
        return new Promise<string>(async resolve => {
            let prompt: HTMLIonAlertElement = await this.alertCtrl.create({
                header,
                message,
                inputs: [{
                    name: 'value',
                    type: 'search',
                    value,
                    placeholder,
                }],
                buttons: [{
                    text: '取消',
                    role: 'cancel',
                    handler: () => resolve(''),
                }, {
                    text: '确认',
                    handler: (data: { value?: string }) => resolve(data.value || ''),
                }],
            });
            await prompt.present();

            let input: Element | null = prompt.querySelector('input[type="search"]');
            if (input) {
                input.setAttribute('autocomplete', 'off');
            }
        });
    }

    public async actionSheet<T>({ header, list, displayMap, listFilter }: {
        list: Array<T> | Observable<Array<T>>;
        header?: string;
        displayMap(value: T): string;
        listFilter?(value: T, index: number, array: Array<T>): unknown;
    }): Promise<T | null> {
        if (Array.isArray(list)) {
            if (!list || list.length < 1) {
                list = new Array<T>();
            }
            let filteredList: Array<T> = listFilter ? list.filter(listFilter) : list;
            if (!filteredList || filteredList.length < 1) {
                filteredList = new Array<T>();
            }

            let res: OverlayEventDetail<T> = await this.getActionSheet<T>({ header, list: filteredList, displayMap });
            return res.data || null;
        } else if (isObservable(list)) {
            return new Promise(resolve => {
                let subscription: Subscription = (list as Observable<Array<T>>).subscribe(async resList => {
                    if (!resList || resList.length < 1) {
                        resList = new Array<T>();
                    }
                    let filteredList: Array<T> = listFilter ? resList.filter(listFilter) : resList;
                    if (!filteredList || filteredList.length < 1) {
                        filteredList = new Array<T>();
                    }

                    let res: OverlayEventDetail<T> = await this.getActionSheet<T>({ header, list: filteredList, displayMap });
                    subscription.unsubscribe();
                    resolve(res.data || null);
                    return;
                }, () => {
                    subscription.unsubscribe();
                    resolve(null);
                }, () => {
                    subscription.unsubscribe();
                });
            });
        } else {
            return null;
        }
    }

    public async autoComplete<T>({ header, placeholder, list, displayMap, filter, listFilter }: {
        list: Array<T> | Observable<Array<T>>;
        header?: string;
        placeholder?: string;
        filter(input: string, value: T): boolean;
        displayMap(value: T): string;
        listFilter?(value: T, index: number, array: Array<T>): unknown;
    }): Promise<T | null> {
        if (Array.isArray(list)) {
            if (!list || list.length < 1) {
                list = new Array<T>();
            }
            let filteredList: Array<T> = listFilter ? list.filter(listFilter) : list;
            if (!filteredList || filteredList.length < 1) {
                filteredList = new Array<T>();
            }

            let res: OverlayEventDetail<T> = await this.getAutoComplete<T>({ header, list: filteredList, displayMap, placeholder, filter });
            return res.data || null;
        } else if (isObservable(list)) {
            return new Promise(resolve => {
                let subscription: Subscription = (list as Observable<Array<T>>).subscribe(async resList => {
                    if (!resList || resList.length < 1) {
                        resList = new Array<T>();
                    }
                    let filteredList: Array<T> = listFilter ? resList.filter(listFilter) : resList;
                    if (!filteredList || filteredList.length < 1) {
                        filteredList = new Array<T>();
                    }

                    let res: OverlayEventDetail<T> = await this.getAutoComplete<T>({ header, list: filteredList, displayMap, placeholder, filter });
                    subscription.unsubscribe();
                    resolve(res.data || null);
                    return;
                }, () => {
                    subscription.unsubscribe();
                    resolve(null);
                }, () => {
                    subscription.unsubscribe();
                });
            });
        } else {
            return null;
        }
    }

    public async showLoading(message: string = '', duration: number = 0): Promise<void> {
        let topLoading: HTMLIonLoadingElement | undefined = await this.loadingCtrl.getTop();
        if (topLoading) {
            await topLoading.dismiss();
        }
        let loading: HTMLIonLoadingElement = await this.loadingCtrl.create({
            message,
            duration,
        });
        await loading.present();
    }

    public async showLoadingWithDelay(
        // delay in milisecond before loading showing up
        delay: number = 450,
        message: string = '',
        duration: number = 0,
    ): Promise<void> {
        let topLoading: HTMLIonLoadingElement | undefined = await this.loadingCtrl.getTop();
        if (topLoading) {
            await topLoading.dismiss();
        }

        if (delay) {
            this.loadingDelayTimer = window.setTimeout(async () => {
                this.loadingDelayTimer = 0;
                let loading: HTMLIonLoadingElement = await this.loadingCtrl.create({
                    message,
                    duration,
                });
                await loading.present();
            }, delay);
        } else {
            let loading: HTMLIonLoadingElement = await this.loadingCtrl.create({
                message,
                duration,
            });
            await loading.present();
        }
    }

    public async hideLoading(): Promise<void> {
        if (this.loadingDelayTimer) {
            let topLoading: HTMLIonLoadingElement | undefined = await this.loadingCtrl.getTop();
            if (topLoading) {
                await topLoading.dismiss();
            }
            window.clearTimeout(this.loadingDelayTimer);
            this.loadingDelayTimer = 0;
        } else {
            try {
                await this.loadingCtrl.dismiss();
            } catch { }
        }
    }

    public async setStatusBarColor(color: string): Promise<void> {
        if (color && this.platform.is('hybrid') && Plugins.StatusBar) {
            try {
                await Plugins.StatusBar.setBackgroundColor({ color });
            } catch { }
        }
    }

    public async setStatusBarStyle(option: StatusBarStyleOptions): Promise<void> {
        if (option && this.platform.is('hybrid') && Plugins.StatusBar) {
            try {
                await Plugins.StatusBar.setStyle(option);
            } catch { }
        }
    }

    public async dismissOverlays(types: Array<IonOverlayTypes> = ['alert', 'actionsheet', 'loading', 'modal', 'picker', 'popover', 'toast']): Promise<void> {
        if (!types || types.length < 1) { return; }

        if (types.indexOf('alert') >= 0) {
            let topAlert: HTMLIonAlertElement | undefined = await this.alertCtrl.getTop();
            if (topAlert) {
                await topAlert.dismiss();
            }
        }

        if (types.indexOf('actionsheet') >= 0) {
            let topActionSheet: HTMLIonActionSheetElement | undefined = await this.actionSheetCtrl.getTop();
            if (topActionSheet) {
                await topActionSheet.dismiss();
            }
        }

        if (types.indexOf('loading') >= 0) {
            let topLoading: HTMLIonLoadingElement | undefined = await this.loadingCtrl.getTop();
            if (topLoading) {
                await topLoading.dismiss();
            }
        }

        if (types.indexOf('modal') >= 0) {
            let topModal: HTMLIonModalElement | undefined = await this.modalCtrl.getTop();
            if (topModal) {
                await topModal.dismiss();
            }
        }

        if (types.indexOf('picker') >= 0) {
            let topPicker: HTMLIonPickerElement | undefined = await this.pickerCtrl.getTop();
            if (topPicker) {
                await topPicker.dismiss();
            }
        }

        if (types.indexOf('popover') >= 0) {
            let topPop: HTMLIonPopoverElement | undefined = await this.popCtrl.getTop();
            if (topPop) {
                await topPop.dismiss();
            }
        }

        if (types.indexOf('toast') >= 0) {
            let topToast: HTMLIonToastElement | undefined = await this.toastCtrl.getTop();
            if (topToast) {
                await topToast.dismiss();
            }
        }

    }

    public async autoCompleteAsync<T>({ header, placeholder, query, displayMap, listFilter }: {
        header?: string;
        placeholder?: string;
        query(key: string): Observable<ListResponse<T>>;
        displayMap(item: T): string;
        listFilter?(value: T, index: number, array: Array<T>): unknown;
    }): Promise<T | null> {
        let sub: Subject<string> = new Subject();
        let list$: Observable<Array<T>> = sub.asObservable().pipe(
            startWith(''),
            switchMap(query),
            map(l => l.items),
        );

        let topActionSheet: HTMLIonActionSheetElement | undefined = await this.actionSheetCtrl.getTop();
        if (topActionSheet) {
            await topActionSheet.dismiss();
        }

        let buttons: Array<string | ActionSheetButton> = [{
            text: '取消',
            role: 'cancel',
        }];

        let actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
            header: header || '请选择',
            buttons,
        });

        let titleEle: Element | null = actionSheet.querySelector('.action-sheet-title');
        let inputEle: HTMLIonInputElement;
        if (titleEle && titleEle.parentElement) {
            inputEle = document.createElement('ion-input');
            inputEle.placeholder = placeholder || '请输入以查询';
            inputEle.clearInput = true;
            inputEle.style.setProperty('--padding-start', '1rem');
            inputEle.addEventListener('ionChange', e => {
                let inputValue: string = (e as CustomEvent<{ value: string }>).detail.value;
                sub.next(inputValue);
                spinnerItemEle.style.display = 'block';
                while (spinnerItemEle.nextSibling) {
                    spinnerItemEle.nextSibling?.remove();
                }
            });
            titleEle.parentElement.insertBefore(inputEle, titleEle.nextElementSibling);
        }

        let spinnerItemEle: HTMLDivElement = document.createElement('div');
        spinnerItemEle.style.textAlign = 'center';
        let spinnerEle: HTMLIonSpinnerElement = document.createElement('ion-spinner');
        spinnerEle.style.margin = '0 auto';
        spinnerItemEle.appendChild(spinnerEle);
        titleEle?.parentElement?.appendChild(spinnerItemEle);

        await actionSheet.present();

        return new Promise<T | null>(resolve => {
            let listSubscription: Subscription = list$.subscribe(async items => {
                spinnerItemEle.style.display = 'none';

                let filteredItems: Array<T> = listFilter ? items.filter(listFilter) : items;
                if (!filteredItems || filteredItems.length < 1) {
                    titleEle?.parentElement?.appendChild(this.makeActionsheetButton('没有找到相关信息'));
                    return;
                } else {
                    for (const item of filteredItems) {
                        titleEle?.parentElement?.appendChild(this.makeActionsheetButton(displayMap(item), () => actionSheet.dismiss(item)));
                    }
                }

                let actionDetail: OverlayEventDetail<T> = await actionSheet.onWillDismiss();
                sub.complete();
                listSubscription.unsubscribe();
                resolve(actionDetail.data || null);
            });
        });

    }

    private async getActionSheet<T>({ header, list, displayMap }: {
        list: Array<T>;
        header?: string;
        displayMap(value: T): string;
    }): Promise<OverlayEventDetail<T>> {
        let topActionSheet: HTMLIonActionSheetElement | undefined = await this.actionSheetCtrl.getTop();
        if (topActionSheet) {
            await topActionSheet.dismiss();
        }

        let actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
            header,
            buttons: [...list.map(i => ({
                text: displayMap(i),
                handler: () => actionSheet.dismiss(i),
            })), {
                text: '取消',
                role: 'cancel',
            }],
        });
        await actionSheet.present();
        return actionSheet.onWillDismiss();
    }

    private async getAutoComplete<T>({ header, list, displayMap, placeholder, filter }: {
        list: Array<T>;
        header?: string;
        placeholder?: string;
        displayMap(value: T): string;
        filter(input: string, value: T): boolean;
    }): Promise<OverlayEventDetail<T>> {
        let topActionSheet: HTMLIonActionSheetElement | undefined = await this.actionSheetCtrl.getTop();
        if (topActionSheet) {
            await topActionSheet.dismiss();
        }

        let actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
            header,
            buttons: [...list.map(i => ({
                text: displayMap(i),
                handler: () => actionSheet.dismiss(i),
            })), {
                text: '取消',
                role: 'cancel',
            }],
        });
        let titleEle: Element | null = actionSheet.querySelector('.action-sheet-title');
        if (titleEle && titleEle.parentElement) {
            let inputEle: HTMLIonInputElement = document.createElement('ion-input');
            inputEle.placeholder = placeholder;
            inputEle.clearInput = true;
            inputEle.style.setProperty('--padding-start', '1rem');
            inputEle.addEventListener('ionChange', e => {
                let input: string = (e as CustomEvent<{
                    value: string;
                }>).detail.value;
                if (input) {
                    actionSheet.buttons = [...list.filter(i => filter(input, i)).map(i => ({
                        text: displayMap(i),
                        handler: () => actionSheet.dismiss(i),
                    })), {
                        text: '取消',
                        role: 'cancel',
                    }];
                } else {
                    actionSheet.buttons = [...list.map(i => ({
                        text: displayMap(i),
                        handler: () => actionSheet.dismiss(i),
                    })), {
                        text: '取消',
                        role: 'cancel',
                    }];
                }
            });
            titleEle.parentElement.insertBefore(inputEle, titleEle.nextElementSibling);
        }
        await actionSheet.present();
        return actionSheet.onWillDismiss();
    }

    private makeActionsheetButton(text: string, onClick?: () => void): HTMLButtonElement {
        let buttonEle: HTMLButtonElement = document.createElement('button');
        buttonEle.type = 'button';
        buttonEle.classList.add(...['action-sheet-button', 'ion-activatable', 'ion-focusable']);
        buttonEle.setAttribute('ion-activatable', '');
        let innerSpan: HTMLSpanElement = document.createElement('span');
        innerSpan.classList.add('action-sheet-button-inner');
        if (this.platform.is('ios')) {
            innerSpan.classList.add('sc-ion-action-sheet-ios');
        } else {
            innerSpan.classList.add('sc-ion-action-sheet-md');
        }
        innerSpan.innerText = text;
        buttonEle.appendChild(innerSpan);
        if (this.platform.is('ios')) {
            buttonEle.classList.add('sc-ion-action-sheet-ios');
        } else {
            buttonEle.classList.add('sc-ion-action-sheet-md');
            let rippleEle: HTMLIonRippleEffectElement = document.createElement('ion-ripple-effect');
            rippleEle.classList.add('sc-ion-action-sheet-md');
            buttonEle.appendChild(rippleEle);
        }
        if (onClick) {
            buttonEle.onclick = onClick;
        } else {
            buttonEle.disabled = true;
            buttonEle.style.opacity = '0.63';
        }

        return buttonEle;
    }

}
