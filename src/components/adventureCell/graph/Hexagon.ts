import { EmitEvent, Shape } from '@livereader/graphly-d3/dist/templateAPI';
import type { Template } from '@livereader/graphly-d3/dist/types/Template';
import { emitter, EventName } from './EventBus';

const shape: Template = {
  shapeSize: 220,
  shapeBuilder(data, TemplateAPI) {
    const { ShapeStyle, SVGShape, TextCollection, CollectionStyle, Shape } =
      TemplateAPI;

    const shape = Shape.Rectangle(400, 400, 15);

    shape.select('path').style('fill', data.payload?.color ?? '#9575cd');

    const titleShape = TextCollection(
      data.payload?.title ?? '',
      CollectionStyle(220, 220, 80, 65, 10, 10, 2, 'center'),
      [
        ShapeStyle('class', ''),
        ShapeStyle('font', 'bold 30px sans-serif'),
        ShapeStyle('fill', 'black'),
        ShapeStyle('text-anchor', 'middle'),
      ]
    );
    const image = SVGShape(`
      <defs>
      <rect id="rect" x="20" y="20%" width="360" height="50%" rx="15"/>
        <clipPath id="clip">
          <use xlink:href="#rect"/>
        </clipPath>
      </defs>

      <use xlink:href="#rect" stroke-width="2" stroke="transparent"/>
      <image xlink:href="${data.payload.image}" preserveAspectRatio="xMinYMax meet"
      height="100%" width="100%" x="0" y="15" clip-path="url(#clip)"/>
    `);
    shape.append(() => image.node());
    shape.append(() => titleShape.node());
    shape.on('click', () => {
      emitter.trigger(EventName.CellClicked, data.id);
    });

    return shape;
  },
};

export default shape;
