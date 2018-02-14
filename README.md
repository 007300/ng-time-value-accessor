# ng-date-value-accessor

[![Build Status](https://travis-ci.org/007300/ng-date-value-accessor.svg?branch=master)](https://travis-ci.org/007300/ng-date-value-accessor)

A Date value accessor for Angular 5, inspired by angular-date-value-accessor.
You can use JavaScript Date objects directly with two-way data bindings (ngModel) as well as with reactive forms (formControlName/formControl).

In order to display the UTC date with timezone offset correctly (without breaking existing data, e.g. a date 2018-01-31T23:00:00.000Z should be Feb 1st, 2018 in CET), the value will be formatted between angular form and native element.

## Examples:

Add the attribute `dateInput` to a date input control:

```html
<input type="date" name="myBirthday" ngModel dateInput>

OR

<input type="date" name="myBirthday" [(ngModel)]="myBirthday" dateInput>

OR

<input type="date" formControlName="myBirthday" dateInput>
```

## Installation:

Install the package via yarn/npm:

```bash
yarn add ng-date-value-accessor
npm install --save ng-date-value-accessor
```

Then import the module via NgModule:

```js
// app.module.ts

import { DateValueAccessorModule } from "ng-date-value-accessor";

@NgModule({
  imports: [DateValueAccessorModule]
})
export class AppModule {}
```
