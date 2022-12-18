import {
  Anchor,
  AnchorType,
  LinkStrength,
  LinkType,
} from '@livereader/graphly-d3';
import type { Link, Node } from '@livereader/graphly-d3';
import { AdventureCellState } from '@/models';

export interface D3Graph {
  nodes: D3LocationNode[];
  links: D3LocationLink[];
}

export const toD3Format = (list: AdventureCellState[]): D3Graph => {
  return {
    nodes: list.map(
      (item, index) =>
        new D3LocationNode(
          item.key,
          150,
          index * 10,
          item.location?.name,
          '#fff',
          item.location?.image
        )
    ),
    links: list.reduce<D3LocationLink[]>((result, node) => {
      const nodeLinks = node.neighbours.map(
        (id) => new D3LocationLink(node.key, id)
      );

      return [...result, ...nodeLinks];
    }, []),
  };
};

class D3LocationNode implements Node {
  public shape = {
    type: 'hexagon',
    scale: 1,
  };

  public anchor?: Anchor | undefined;

  public payload: {
    title?: string;
    color?: string;
    image?: string;
  } = {};
  constructor(
    public id: string,
    public x: number,
    public y: number,
    title?: string,
    color?: string,
    image?: string
  ) {
    this.payload.title = title;
    this.payload.color = color;
    this.payload.image = image;
  }
}

class D3LocationLink implements Link {
  public directed = true;
  public strength = LinkStrength.Weak;
  public type = LinkType.Dashed;
  constructor(public source: string, public target: string) {}
}
