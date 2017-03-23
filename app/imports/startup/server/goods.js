import { Goods } from '../../api/goods/goods.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Goods to pre-fill the Collection.
 * @type {*[]}
 */
const goodSeeds = [
  {
    category: 'DVDs',
    item: 'Deadpool',
    condition: 'Like New',
    asking: 5,
  },
  {
    category: 'DVDs',
    item: 'Ferris Buellers Day Off',
    condition: 'Used',
    asking: 4,
  },
  {
    category: 'DVDs',
    item: 'Raiders of the Lost Ark',
    condition: 'Like New',
    asking: 5,
  },
  {
    category: 'Furniture',
    item: 'Ottoman',
    condition: 'Fair',
    asking: 40,
  },
  {
    category: 'Furniture',
    item: 'Book Shelf',
    condition: 'Fair',
    asking: 25,
  },
  {
    category: 'Furniture',
    item: 'Computer Desk',
    condition: 'Fair',
    asking: 30,
  },
  {
    category: 'Furniture',
    item: 'Computer Chair',
    condition: 'Like New',
    asking: 50,
  },
];

/**
 * Initialize the Goods collection if empty with seed data.
 */
if (Goods.find().count() === 0) {
  _.each(goodSeeds, function seedGoods(stuff) {
    Goods.insert(stuff);
  });
}
