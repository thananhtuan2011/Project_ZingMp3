"use strict";
// tslint:disable:no-string-literal
exports.__esModule = true;
// https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var auth_service_1 = require("../_services/auth.service");
var login_component_1 = require("./login.component");
var testing_2 = require("@angular/common/http/testing");
var rxjs_1 = require("rxjs");
var user_model_1 = require("../_models/user.model");
var logout_component_1 = require("../logout/logout.component");
var core_1 = require("@ngx-translate/core");
var fakeAuth = {
    email: 'admin@demo.com',
    password: 'demo'
};
var mockActivatedRoute = {
    snapshot: {
        params: {},
        queryParams: {}
    }
};
var fakeRoutes = [
    { path: 'auth/login', component: login_component_1.LoginComponent },
    { path: 'auth/logout', component: logout_component_1.LogoutComponent },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
var FakeAuthService = /** @class */ (function () {
    function FakeAuthService() {
    }
    FakeAuthService.prototype.login = function (email, password) {
        var isChecked = email === fakeAuth.email && password === fakeAuth.password;
        if (!isChecked) {
            return rxjs_1.of(undefined);
        }
        var user = new user_model_1.UserModel();
        user.username = 'admin';
        user.password = 'demo';
        user.email = 'admin@demo.com';
        return rxjs_1.of(user);
    };
    return FakeAuthService;
}());
describe('LoginComponent', function () {
    var component;
    var fixture;
    var injector;
    var authService;
    beforeEach(testing_1.waitForAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                testing_2.HttpClientTestingModule,
                router_1.RouterModule.forRoot(fakeRoutes),
                core_1.TranslateModule,
            ],
            declarations: [login_component_1.LoginComponent],
            providers: [
                {
                    provide: router_1.ActivatedRoute,
                    useValue: mockActivatedRoute
                },
                {
                    provide: auth_service_1.AuthService,
                    useClass: FakeAuthService
                },
            ]
        }).compileComponents();
        injector = testing_1.getTestBed();
        authService = injector.get(auth_service_1.AuthService);
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('form valid with default data', function () {
        expect(component.loginForm.valid).toBeTruthy();
    });
    it('email field validity', function () {
        var errors = {};
        var email = component.loginForm.controls['email'];
        expect(email.valid).toBeTruthy();
        // Email field is required
        // Set empty email first
        email.setValue('');
        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();
        // Set email to something
        email.setValue('te');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeTruthy();
        expect(errors['minlength']).toBeTruthy();
        // Set email to something correct
        email.setValue('test@example.com');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeFalsy();
    });
    it('password field validity', function () {
        var errors;
        var password = component.loginForm.controls['password'];
        expect(password.valid).toBeTruthy();
        password.setValue('12');
        expect(password.value).toBe('12');
        errors = password.errors || {};
        expect(errors['minlength']).toBeTruthy();
        password.setValue('');
        expect(password.value).toBe('');
        expect(password.valid).toBeFalsy();
        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();
        // Set password to something correct
        password.setValue('123456789');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeFalsy();
    });
});
