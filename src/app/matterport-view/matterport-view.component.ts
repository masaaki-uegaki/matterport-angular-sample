import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TagId } from '../models/TagId';
import { MatterportService } from '../services/matterport.service';

@Component({
    selector: 'app-matterport-view',
    templateUrl: './matterport-view.component.html',
    styleUrls: ['./matterport-view.component.scss'],
})
export class MatterportViewComponent implements OnInit {
    @ViewChild('showCaseIframe', { static: true })
    showCaseElement!: ElementRef<HTMLIFrameElement>;
    selectedTagId?: TagId;
    hoveredTagId?: TagId;

    constructor(private matterPort: MatterportService) {}

    async ngOnInit(): Promise<void> {
        // Matterportの表示
        this.matterPort.getViewUrl().subscribe((url) => {
            this.showCaseElement.nativeElement.src = url;
        });

        await this.matterPort.initializeSDK(this.showCaseElement.nativeElement);
        this.matterPort.listenClickEvent().subscribe((id) => {
            this.selectedTagId = id;
        });
        this.matterPort.listenHoverEvent().subscribe(({ id, hovering }) => {
            this.hoveredTagId = hovering ? id : undefined;
        });
    }
}
