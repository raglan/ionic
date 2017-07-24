import { Component, CssClassObject, h, Prop } from '@stencil/core';


@Component({
  tag: 'ion-chip-button'
})
export class ChipButton {
  $el: HTMLElement;
  mode: string;
  color: string;

  @Prop() href: string;

  /**
   * @Prop {boolean} If true, activates a transparent button style.
   */
  @Prop() clear: boolean = false;

  /**
   * @Prop {boolean} If true, sets the button into a disabled state.
   */
  @Prop() disabled: boolean = false;

  /**
   * @hidden
   * Get the classes based on the button type
   * e.g. alert-button, action-sheet-button
   */
  getButtonClassList(buttonType: string, mode: string): string[] {
    if (!buttonType) {
      return [];
    }
    return [
      buttonType,
      `${buttonType}-${mode}`
    ];
  }

  /**
   * @hidden
   * Get the classes for the color
   */
  getColorClassList(color: string, buttonType: string, style: string, mode: string): string[] {
    let className = (style === 'default') ? `${buttonType}` : `${buttonType}-${style}`;

    return [`${className}-${mode}`].concat(
        style !== 'default' ? `${className}` : [],
        color ? `${className}-${mode}-${color}` : []
      );
  }

  /**
   * @hidden
   * Get the classes for the style
   * Chip buttons can only be clear or default (solid)
   */
  getStyleClassList(buttonType: string): string[] {
    let classList = [].concat(
      this.clear ? this.getColorClassList(this.color, buttonType, 'clear', this.mode) : []
    );

    if (classList.length === 0) {
      classList = this.getColorClassList(this.color, buttonType, 'default', this.mode);
    }

    return classList;
  }

  /**
   * @hidden
   * Get the element classes to add to the child element
   */
  getElementClassList() {
    let classList = [].concat(
      this.$el.className.length ? this.$el.className.split(' ') : []
    );

    return classList;
  }

  render() {
    const buttonType = 'chip-button';

    var buttonClasses: CssClassObject = []
      .concat(
        this.getButtonClassList(buttonType, this.mode),
        this.getElementClassList(),
        this.getStyleClassList(buttonType)
      )
      .reduce((prevValue, cssClass) => {
        prevValue[cssClass] = true;
        return prevValue;
      }, {});

    const TagType = this.href ? 'a' : 'button';

    return (
      <TagType class={buttonClasses} disabled={this.disabled}>
        <span class='button-inner'>
          <slot></slot>
        </span>
        <div class='button-effect'></div>
      </TagType>
    );
  }
}