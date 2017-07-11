import {Model} from 'backbone';
import {View} from 'backbone.marionette';
import {className, regions} from '../../decorators/index';
import PaneSetView from '../pane-set/PaneSetView';
import TreeView from '../tree/TreeView';
import {fetchAndShow} from '../../utils/loading';

@className('tree-view-panes')
@regions({
    content: '.tree-view-panes__content'
})
class TreeViewPanes extends View {
    template = () => '<div class="tree-view-panes__content"></div>';

    initialize(options) {
        super.initialize(options);

        this.panes = new PaneSetView();
        this.treeState = new Model();
        this.listenTo(this.treeState, 'change:id', this.showLeaf);
    }

    showLeaf() {
        const id = this.treeState.get('id');
        const {params, leafModel, leafView, baseUrl} = this.options;
        const leaf = new leafModel({id});
        leaf.set({id});
        leaf.fetch().then(() => {
            this.panes.addPane('leaf', new leafView({
                model: leaf,
                params: params,
                baseUrl: baseUrl + '/' + id
            }));
            this.panes.updatePanesPositions();
        });
    }

    onRender() {
        const {params, tree, treeSorters, tabName, baseUrl} = this.options;
        const segments = params ? params.split('/') : [null];

        const leafId = segments[0];
        const suffix = segments.slice(1).join('/');

        fetchAndShow(this, 'content', tree, this.panes, () => {
            this.panes.addPane('tree', new TreeView({
                collection: tree,
                treeState: this.treeState,
                treeSorters: treeSorters,
                tabName: tabName,
                baseUrl: baseUrl,
                suffix: suffix
            }));

            if (leafId) {
                this.treeState.set('id', leafId);
            } else {
                this.panes.updatePanesPositions();
            }
        });

    }
}

export default TreeViewPanes;