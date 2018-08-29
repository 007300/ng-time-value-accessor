import 'es6-shim';
import 'reflect-metadata';

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { Component, DebugElement, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { SecValueAccessor } from './sec-value-accessor';
import { TimeValueAccessorModule } from './module';

TestBed.initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);

@Component({
	template: `
		<form>
			<input type="time" name="normalInput" [(ngModel)]="testTime1">
			<input type="time" name="modifiedInput" [(ngModel)]="testTime2" timeAsSec>
		</form>`
})
export class TestFormComponent {
	testTime1: number;
	testTime2: number;

	constructor() {
		this.testTime1 = 300;
		this.testTime2 = 3660;
	}
}

@NgModule({
	declarations: [TestFormComponent],
	imports: [FormsModule, TimeValueAccessorModule],
	exports: [TestFormComponent, SecValueAccessor]
})
export class DummyModule {}

function dispatchEvent(
	inputElement: HTMLInputElement,
	fixture: ComponentFixture<TestFormComponent>,
	text: string
) {
	inputElement.value = text;
	inputElement.dispatchEvent(new Event('input'));
	fixture.detectChanges();
	return fixture.whenStable();
}

describe('SecValueAccessor', () => {
	const timeString = '06:12';
	let fixture: ComponentFixture<TestFormComponent>;
	let component: TestFormComponent;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, DummyModule]
		});

		fixture = TestBed.createComponent(TestFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	describe('without the "useValueAsNumber" attribute', () => {
		let normalInput: DebugElement;
		beforeEach(() =>
			(normalInput = fixture.debugElement.query(
				By.css('input[name=normalInput]')
			)));

		it('should NOT understand a number', () => {
			expect(normalInput.nativeElement.value).toBe('');
		});

		it('should populate a simple string on change', async(() => {
			dispatchEvent(normalInput.nativeElement, fixture, timeString).then(() => {
				expect(component.testTime1).toEqual(timeString);
			});
		}));
	});

	describe('with the "useValueAsNumber" attribute', () => {
		let modifiedInput: DebugElement;
		beforeEach(() =>
			(modifiedInput = fixture.debugElement.query(
				By.css('input[name=modifiedInput]')
			)));

		it('should understand the number of seconds', () => {
			// 3660 seconds -> 01:01
			expect(modifiedInput.nativeElement.value).toBe('01:01');
		});

		it('should also populate a number (instead of strings) on change', async(() => {
			dispatchEvent(modifiedInput.nativeElement, fixture, timeString).then(
				() => {
					expect(component.testTime2).toEqual(jasmine.any(Number));
					// 06:00 -> 6 hours and 12 minutes
					expect(component.testTime2).toEqual(6 * 3600 + 12 * 60);
				}
			);
		}));
	});
});
