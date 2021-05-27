import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ProgressCirclePath, ProgressColorGradient, ProgressFormatter, ProgressGapPositionType, ProgressGradientProgress, ProgressStatusType, ProgressStepItem, ProgressStrokeColorType, ProgressStrokeLinecapType, ProgressTypeType } from './typings';
import { handleCircleGradient, handleLinearGradient } from './utils';
let gradientIdSeed: number = 0;

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss'],
})

export class ProgressComponent implements OnChanges, OnDestroy {

    @Input()
    public showInfo: boolean = true;

    @Input()
    public width: number = 132;

    @Input()
    public strokeColor: ProgressStrokeColorType = '';

    @Input()
    public size: 'default' | 'small' = 'default';

    @Input()
    public formatter?: ProgressFormatter;

    @Input()
    public successPercent?: number;

    @Input()
    public percent: number = 0;

    @Input()
    public strokeWidth?: number;

    @Input()
    public gapDegree?: number;

    @Input()
    public status?: ProgressStatusType;

    @Input()
    public type: ProgressTypeType = 'line';

    @Input()
    public gapPosition: ProgressGapPositionType = 'top';

    @Input()
    public strokeLinecap: ProgressStrokeLinecapType = 'round';

    @Input()
    public stepCount?: number;

    @Input()
    public statusIconNameMap: Map<string, string> = new Map([
        // 圆形
        ['success-o', 'checkmark'],
        ['exception-o', 'close-3'],
        // 非圆形
        ['success-fill', 'checkmark-2'],
        ['exception-fill', 'close-2'],
    ]);

    @Input()
    public statusColorMap: Map<string, string> = new Map([
        ['normal', '#108ee9'],
        ['exception', '#ff5500'],
        ['success', '#87d068'],
    ]);

    public steps: Array<ProgressStepItem> = [];

    public lineGradient: string | null = null;

    public isGradient: boolean = false;

    public isSteps: boolean = false;

    public gradientId: number = gradientIdSeed++;

    public progressCirclePath: Array<ProgressCirclePath> = [];

    public circleGradient: Array<{ offset: string; color: string }> = [];

    public trailPathStyle?: { [key: string]: any };

    public pathString?: string;

    private cachedStatus: ProgressStatusType = 'normal';

    private inferredStatus: ProgressStatusType = 'normal';

    private destroy$: Subject<void> = new Subject<void>();

    public get getStatus(): ProgressStatusType {
        return this.status || this.inferredStatus;
    }

    public get getStrokeWidth(): number {
        return this.strokeWidth || (this.type === 'line' && this.size !== 'small' ? 8 : 6);
    }

    public get isCircleStyle(): boolean {
        return this.type === 'circle' || this.type === 'dashboard';
    }

    public get format(): string {
        const format: ProgressFormatter = this.formatter || this.defaultFormatter;
        return format(this.percent);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const { stepCount, gapPosition, strokeLinecap, strokeColor, gapDegree, type, status, percent, successPercent } = changes;

        if (status) {
            this.cachedStatus = this.status || this.cachedStatus;
        }

        if (percent || successPercent) {
            const fillAll: boolean = parseInt(this.percent.toString(), 10) >= 100;
            if (fillAll) {
                if ((this.isNotNil(this.successPercent) && this.successPercent >= 100) || this.successPercent === undefined) {
                    this.inferredStatus = 'success';
                }
            } else {
                this.inferredStatus = this.cachedStatus;
            }
        }

        if (status || percent || successPercent) {
            this.updateIcon();
        }

        if (strokeColor) {
            this.setStrokeColor();
        }

        if (gapPosition || strokeLinecap || gapDegree || type || percent || strokeColor) {
            this.getCirclePaths();
        }

        if (stepCount) {
            this.isSteps = this.isNotNil(stepCount.currentValue);
            this.getSteps();
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public trackByFn = (index: number) => `${index}`;

    private defaultFormatter: ProgressFormatter = (p: number): string => `${p}%`;

    private updateIcon(): void {
        const ret: string | undefined = this.statusIconNameMap.get(this.getStatus + (this.isCircleStyle ? '-o' : '-fill'));
    }

    private getSteps(): void {
        const current: number = Math.floor(this.stepCount! * (this.percent / 100));
        const stepWidth: number = this.size === 'small' ? 2 : 14;

        for (let i: number = 0; i < this.stepCount!; i++) {
            let color: ProgressStrokeColorType = '';
            if (i <= current - 1) {
                color = this.strokeColor;
            }
            const stepStyle: ProgressStepItem = {
                backgroundColor: `${color}`,
                width: `${stepWidth}px`,
                height: `${this.getStrokeWidth}px`,
            };
            this.steps.push(stepStyle);
        }
    }

    private getCirclePaths(): void {
        if (!this.isCircleStyle) {
            return;
        }

        const values: Array<number> = this.isNotNil(this.successPercent) ? [this.successPercent, this.percent] : [this.percent];

        const radius: number = 50 - this.getStrokeWidth / 2;
        const gapPosition: ProgressGapPositionType = this.gapPosition || (this.type === 'circle' ? 'top' : 'bottom');
        const len: number = Math.PI * 2 * radius;
        const gapDegree: number = this.gapDegree || (this.type === 'circle' ? 0 : 75);

        let beginPositionX: number = 0;
        let beginPositionY: number = -radius;
        let endPositionX: number = 0;
        let endPositionY: number = radius * -2;

        switch (gapPosition) {
            case 'left':
                beginPositionX = -radius;
                beginPositionY = 0;
                endPositionX = radius * 2;
                endPositionY = 0;
                break;
            case 'right':
                beginPositionX = radius;
                beginPositionY = 0;
                endPositionX = radius * -2;
                endPositionY = 0;
                break;
            case 'bottom':
                beginPositionY = radius;
                endPositionY = radius * 2;
                break;
            default:
                break;
        }

        this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;

        this.trailPathStyle = {
            strokeDasharray: `${len - gapDegree}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
        };

        // Calculate styles for each path.
        this.progressCirclePath = values
            .map((value, index) => {
                const isSuccessPercent: boolean = values.length === 2 && index === 0;
                return {
                    stroke: this.isGradient && !isSuccessPercent ? `url(#gradient-${this.gradientId})` : null,
                    strokePathStyle: {
                        stroke: !this.isGradient ? (isSuccessPercent ? this.statusColorMap.get('success') : (this.strokeColor as string)) : null,
                        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
                        strokeDasharray: `${((value || 0) / 100) * (len - gapDegree)}px ${len}px`,
                        strokeDashoffset: `-${gapDegree / 2}px`,
                    },
                };
            })
            .reverse();
    }

    private setStrokeColor(): void {
        const color: ProgressStrokeColorType = this.strokeColor;
        const isGradient: boolean = (this.isGradient = !!color && typeof color !== 'string');
        if (isGradient && !this.isCircleStyle) {
            this.lineGradient = handleLinearGradient(color as ProgressColorGradient);
        } else if (isGradient && this.isCircleStyle) {
            this.circleGradient = handleCircleGradient(this.strokeColor as ProgressGradientProgress);
        } else {
            this.lineGradient = null;
            this.circleGradient = [];
        }
    }

    private isNotNil<T>(value: T): value is NonNullable<T> {
        return typeof value !== 'undefined' && value !== null;
    }
}
