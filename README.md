# WIP: ng-time-value-accessor

[![Build Status](https://travis-ci.org/007300/ng-time-value-accessor.svg?branch=master)](https://travis-ci.org/007300/ng-time-value-accessor)
[![npm version](https://badge.fury.io/js/ng-time-value-accessor.svg)](https://badge.fury.io/js/ng-time-value-accessor)

A time value accessor for Angular 5+, can be used for input[time].
Instead of 'hh:mm', the time will be converted to seconds since '00:00'.

## Examples:

Add the attribute `timeAsSec` to a date input control:

```html
<input type="time" name="begin" [(ngModel)]="begin" timeAsSec>

OR

<input type="time" formControlName="begin" timeAsSec>
```

## Installation:

Install the package via yarn/npm:

```bash
yarn add ng-time-value-accessor
npm install --save ng-time-value-accessor
```

Then import the module via NgModule:

```js
// app.module.ts

import { TimeValueAccessorModule } from "ng-time-value-accessor";

@NgModule({
  imports: [TimeValueAccessorModule]
})
export class AppModule {}
```
