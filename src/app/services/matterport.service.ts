import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MatterportService {
    // 型定義ファイルがないので、anyで宣言する
    private sdk: any;

    private readonly clickSubject: Subject<string> = new Subject<string>();
    public readonly click$ = this.clickSubject.asObservable();

    constructor() {}

    /**
     * 表示用URLを取得する
     */
    getViewUrl(): Observable<string> {
        // const modelSid = 'SxQL3iGyoDo'; // Construction Site
        const modelSid = 'JGPnGQ6hosj'; // Southern California Luxuary Home

        const url = `https://my.matterport.com/show?m=${modelSid}&qs=1`;
        // APIなどからIDを取得することを想定しObservable型にする
        return of(url);
    }

    /**
     * SDKの初期化を行う
     * @param element Matterportを表示しているIframe要素
     */
    async initializeSDK(element: HTMLIFrameElement): Promise<void> {
        const { matterPortApiKey, matterPortSdkVer } = environment;
        const sdk = await (window as any).MP_SDK.connect(
            element,
            matterPortApiKey,
            matterPortSdkVer
        );
        this.sdk = sdk;
    }

    /**
     * クリックイベントをlistenする
     */
    listenClickEvent(): Observable<string> {
        this.sdk.on(this.sdk.Mattertag.Event.CLICK, (tagSid: string) => {
            this.clickSubject.next(tagSid);
        });
        return this.click$;
    }
}
