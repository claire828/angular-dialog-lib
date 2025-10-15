export class WebEvent {
  static Keyboard = {
    Type: {
      KeyPress: 'keypress',
      KeyUp: 'keyup',
      KeyDown: 'keydown',
      Input: 'input',
    },
    Key: {
      Enter: 'Enter',
      WhiteSpace: ' ',
      Tab: 'Tab',
    },
  };

  static Mouse = {
    Type: {
      Click: 'click',
      DblClick: 'dblclick',
      MouseDown: 'mousedown',
      MouseMove: 'mousemove',
      MouseOut: 'mouseout',
      MouseOver: 'mouseOver',
      MouseUp: 'mouseup',
    },
  };

  static Focus = {
    Type: {
      Focus: 'focus',
      Blur: 'blur',
      FocusOut: 'focusout',
    },
  };

  static Scroll = {
    Type: {
      Scroll: 'scroll',
    },
  };
}
