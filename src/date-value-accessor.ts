import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessor),
  multi: true
};

/**
 * The accessor for writing a value and listening to changes on a date input element
 *
 *  ### Example
 *  `<input type="date" name="birthday" ngModel dateInput>`
 *  OR
 *  `<input type="date" formControlName="birthday" dateInput>`
 */
@Directive({
  selector: "[dateInput]",
  providers: [DATE_VALUE_ACCESSOR]
})
export class DateValueAccessor implements ControlValueAccessor {
  @HostListener("input", ["$event.target.valueAsDate"])
  onChange = (_: any) => {};
  @HostListener("blur", [])
  onTouched = () => {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  /** Write a new value to the element (model -> view) */
  writeValue(value: Date): void {
    if (!value) {
      this.renderer.setProperty(this.elementRef.nativeElement, "value", null);
      return;
    }

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "valueAsDate",
      new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()))
    );
  }

  /** Register function called when value changes (view -> model) */
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = v =>
      fn(
        v instanceof Date
          ? new Date(v.getFullYear(), v.getMonth(), v.getDate())
          : v
      );
  }

  /** Register function when the control blurred */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Enable or disable the element when the control status changes */
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "disabled",
      isDisabled
    );
  }
}
