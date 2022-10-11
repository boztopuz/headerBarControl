import Page1Design from 'generated/pages/page1';
import Label from '@smartface/native/ui/label';
import { Route, Router } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import { i18n } from '@smartface/i18n';
import Color from '@smartface/native/ui/color';
import Page from '@smartface/native/ui/page';
import System from '@smartface/native/device/system';

class StyleableLabel extends styleableComponentMixin(Label) {}

export default class Page1 extends Page1Design {
  private disposeables: (() => void)[] = [];
  lbl: StyleableLabel;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.lbl = new StyleableLabel();
  }


  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    console.log('[page1] onShow');
   
  }
  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    const { headerBar } = System.OS === System.OSType.ANDROID ? this : this.parentController;

    console.log('[page1] onLoad');
    this.btnTrans.on("press", ()=>{
        console.log("transparent clicked");
        //this.headerBar.transparent = true;
        this.headerBar.backgroundColor = Color.TRANSPARENT;
        this.headerBar.title = "HeaderBar Transparent";
       
    });
    this.btnTranslucent.on("press", ()=>{
        
    });
    this.btnRed.on("press", ()=>{
        this.headerBar.transparent = false;
        this.headerBar.backgroundColor = Color.RED;
        this.headerBar.title = "HeaderBar Red";
    });
    this.btnGreen.on("press", ()=>{
        this.headerBar.backgroundColor = Color.GREEN;
        this.headerBar.title = "HeaderBar Green";

    });
    this.btnBlue.on("press", ()=>{
        this.headerBar.backgroundColor = Color.BLUE;
        this.headerBar.title = "HeaderBar Blue";

    });
    this.btnBlack.on("press", ()=>{
        this.headerBar.backgroundColor = Color.WHITE;
        this.headerBar.title = "HeaderBar White";

    });
    this.btnImage.on("press", ()=>{
        this.headerBar.backgroundImage = 'images://smartface.png';
    });
    this.btnNext.on("press", ()=>{
        this.router.push('page2');
    })
  }
}
