declare type CustomEventPayload = {
    detail: {
        elementWidth: number;
        openRatio: string;
        rendered: boolean;
    };
};
export declare class Cocoen extends HTMLElement {
    private container;
    private drag;
    private shadowDOM;
    private onDragStartHandler;
    private onDragEndHandler;
    private onDragHandler;
    private onClickHandler;
    private debouncedUpdateDimensions;
    private xValue;
    private elementWidthValue;
    private dragElementWidthValue;
    private openRatioValue;
    private isDraggingValue;
    private rendered;
    constructor();
    get x(): number;
    set x(value: number);
    get elementWidth(): number;
    set elementWidth(value: number);
    get dragElementWidth(): number;
    set dragElementWidth(value: number);
    get isDragging(): boolean;
    set isDragging(value: boolean);
    get openRatio(): string;
    set openRatio(value: string);
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
    updateDimensions(): void;
    updateStyles(): void;
    onDragStart(event: MouseEvent | TouchEvent): void;
    onDrag(event: MouseEvent | TouchEvent): void;
    onDragEnd(): void;
    onClick(event: MouseEvent): void;
    calculateXfromEvent(event: MouseEvent | TouchEvent): number;
    calculateOpenRatio(activeX: number): string;
    customEventPayload(): CustomEventPayload;
}
export {};
//# sourceMappingURL=cocoen.d.ts.map