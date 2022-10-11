import Page1Design from 'generated/pages/page1';
import Label from '@smartface/native/ui/label';
import { Route, Router } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import { i18n } from '@smartface/i18n';
import Color from '@smartface/native/ui/color';
import Page from '@smartface/native/ui/page';
import System from '@smartface/native/device/system';
import { convertCompilerOptionsFromJson } from 'typescript';
import { HeaderBartype } from '@smartface/router/lib/core/Controller';
import { IColor } from '@smartface/native/ui/color/color';

class StyleableLabel extends styleableComponentMixin(Label) { }

export default class Page1 extends Page1Design {
    private disposeables: (() => void)[] = [];
    lbl: StyleableLabel;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.lbl = new StyleableLabel();
    }


    /**
     * @event onShow
     * This event is called when a page appears on the screen (everytime). 1111
     */
    onShow() {
        super.onShow();
        const { headerBar } = System.OS === System.OSType.ANDROID ? this : this.parentController;

        // TestCase 1
        updateHeaderBar(headerBar, Color.TRANSPARENT, false)
        assertEqual(headerBar.ios.translucent, true, "Test Case 1.0", "When headerbar is transparency 'translucent' property should be true")
        assertEqual(headerBar.transparent, false, "Test Case 1.1", "When headerbar is transparency 'transclucent' property should be true")

        // TestCase 2
        updateHeaderBar(headerBar, Color.TRANSPARENT, true)
        assertEqual(headerBar.transparent, true, "Test Case 2", "When we assign transparent background color we expecte transparent headerbar")

        // TestCase 3
        updateHeaderBar(headerBar, Color.GRAY, true)
        assertEqual(headerBar.transparent, true, "Test Case 3-Transparent", "When we assign transparent background non alpha bg color and transparent true")
        assertEqual(headerBar.backgroundColor.alpha(), 0, "Test Case 3-BackgroundColor", "When we assign transparent as true we expect to background color alpha is 0")

        // TestCase 7
        updateHeaderBar(headerBar, Color.TRANSPARENT, false)
        assertEqual(headerBar.transparent, false, "Test Case 7-Transparent", "when bgColor is transparent translucent and transparent should be false")
        assertEqual(headerBar.backgroundColor.alpha(), 0, "Test Case 7-BackgroundColor", "")
        headerBar.backgroundColor = Color.TRANSPARENT;
        headerBar.ios.translucent = false
        assertEqual(headerBar.backgroundColor.alpha(), 0, "Test Case 7-BackgroundColor", "")
        assertEqual(headerBar.ios.translucent, true, "Test Case 7-translucent", "")

        // TestCase 4
        updateHeaderBar(headerBar, Color.GREEN, false)
        assertEqual(headerBar.transparent, false, "Test Case 4-Transparent", "when transparent false, translucent false")
        assertEqual(headerBar.backgroundColor.alpha(), 255, "Test Case 4-BackgroundColor", "")

        // TestCase 5
        updateHeaderBar(headerBar, Color.TRANSPARENT, false)
        assertEqual(headerBar.transparent, false, "Test Case 5-Transparent", "when transparent false, translucent should be false")
        assertEqual(headerBar.backgroundColor.alpha(), 0, "Test Case 5-BackgroundColor", "")

        // TestCase 6
        updateHeaderBar(headerBar, Color.TRANSPARENT, false)
        assertEqual(headerBar.transparent, false, "Test Case 6-Transparent", "when color transparent. transparent and transculent shoul be false ")
        assertEqual(headerBar.backgroundColor.alpha(), 0, "Test Case 6-BackgroundColor", "")
        headerBar.backgroundColor = Color.GRAY;
        assertEqual(headerBar.backgroundColor.alpha(), 255, "Test Case 6.1-BackgroundColor", "")
        headerBar.transparent = true;
        assertEqual(headerBar.backgroundColor.alpha(), 0, "Test Case 6.1.1-BackgroundColor", "")
    }
    /**
     * @event onLoad
     * This event is called once when page is created.d
     */
    onLoad() {
        super.onLoad();
        const { headerBar } = System.OS === System.OSType.ANDROID ? this : this.parentController;

        console.log('[page1] onLoad');
        this.btnTrans.on("press", () => {
            console.log("transparent clicked");
            // headerBar.transparent = true;
            headerBar.backgroundColor = Color.TRANSPARENT;
            this.headerBar.title = "HeaderBar Transparent";

        });
        this.btnTranslucent.on("press", () => {

        });
        this.btnRed.on("press", () => {
            headerBar.backgroundColor = Color.RED;
            headerBar.title = "HeaderBar Red";
        });
        this.btnGreen.on("press", () => {
            headerBar.backgroundColor = Color.GREEN;
            headerBar.title = "HeaderBar Green";

        });
        this.btnBlue.on("press", () => {
            headerBar.backgroundColor = Color.BLUE;
            headerBar.title = "HeaderBar Blue";

        });
        this.btnBlack.on("press", () => {
            headerBar.backgroundColor = Color.WHITE;
            headerBar.title = "HeaderBar White";

        });
        this.btnImage.on("press", () => {
            headerBar.backgroundImage = 'images://smartface.png';
        });
        this.btnNext.on("press", () => {
            this.router.push('page2');
        })
    }
}



function assertEqual(params1, params2, testCase, message) {
    if (params1 === params2) {
        return console.info(testCase, " - Successfull")
    }

    console.error(testCase, ' - Failed: ', message)
}

function updateHeaderBar(headerBar: HeaderBartype, backgroundColor: IColor, transparent: boolean, translucent?: boolean) {
    headerBar.backgroundColor = backgroundColor
    headerBar.transparent = transparent

    if (translucent) {
        headerBar.ios.translucent = translucent
    }
}