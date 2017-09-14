import ObjectAssign from 'object-assign';
import chart from '../../../core/chart';

export default function() {
  this.on('mount', () => {
    new chart.Chart(ObjectAssign({
      type: 'stacked-area',
      plugins: [
        chart.api.plugins.get('tooltip')()
      ]
    }, this.opts.response)).renderTo(this.refs.canvas);
  });
}
