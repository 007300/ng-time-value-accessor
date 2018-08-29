import {
	Directive,
	ElementRef,
	forwardRef,
	HostListener,
	Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TIME_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SecValueAccessor),
	multi: true
};

/**
 * The accessor for writing a value and listening to changes on a time input element
 *
 *  ### Example
 *  `<input type="time" name="begin" ngModel timeAsSec>`
 *  OR
 *  `<input type="time" formControlName="begin" timeAsSec>`
 */
@Directive({
	selector: '[timeAsSec]',
	providers: [TIME_VALUE_ACCESSOR]
})
export class SecValueAccessor implements ControlValueAccessor {
	@HostListener('input', ['$event.target.valueAsNumber'])
	onChange = (_: any) => {};
	@HostListener('blur', [])
	onTouched = () => {};

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

	/** Write a new value to the element (model -> view) */
	writeValue(value: number): void {
		if (!value) {
			this.renderer.setProperty(this.elementRef.nativeElement, 'value', null);
			return;
		}

		this.renderer.setProperty(
			this.elementRef.nativeElement,
			'valueAsNumber',
			value * 1000
		);
	}

	/** Register function called when value changes (view -> model) */
	registerOnChange(fn: (_: any) => void): void {
		this.onChange = v => fn(v / 1000);
	}

	/** Register function when the control blurred */
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	/** Enable or disable the element when the control status changes */
	setDisabledState(isDisabled: boolean): void {
		this.renderer.setProperty(
			this.elementRef.nativeElement,
			'disabled',
			isDisabled
		);
	}
}
