/**
 * Created by SamXiao on 2016/10/4.
 */

(function ($) {

    var defaults = {
        collapseAll: true,
        draggable: false,
        selectable: true,

        selectedClass: 'dd-selected',
        /**
         * Nestable List Options
         */
        listNodeName: 'ol',
        itemNodeName: 'li',
        rootClass: 'dd',
        listClass: 'dd-list',
        itemClass: 'dd-item',
        dragClass: 'dd-dragel',
        handleClass: 'dd-handle',
        collapsedClass: 'dd-collapsed',
        placeClass: 'dd-placeholder',
        noDragClass: 'dd-nodrag',
        emptyClass: 'dd-empty',
        expandBtnHTML: '<button data-action="expand" type="button">Expand</button>',
        collapseBtnHTML: '<button data-action="collapse" type="button">Collapse</button>',
        group: 0,
        maxDepth: 5,
        threshold: 20
    };

    function brightNestable(element, options) {
        this.w = $(document);
        this.el = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    brightNestable.prototype = {
        nestableListObj: null,
        init: function () {
            var me = this;
            $(this.el).nestable(this.options);
            this.nestableListObj = $(this.el).data('nestable');
            if (this.options.collapseAll) {
                this.collapseAll();
            }

            function onSelected(e) {
                var handle = $(e.target);
                me.toggleSelected(handle);
            }

            if (this.options.selectable) {
                $(this.el).on('click', '.dd-handle', onSelected);
            }

            if (!this.options.draggable) {
                $(this.el).on('mousedown', '.' + this.options.handleClass, function (e) {
                    e.stopPropagation();
                });
            }
        },
        reset: function () {
            this.nestableListObj.reset();
        },
        expandItem: function (li) {
            this.nestableListObj.expandItem(li);
            if ($(li).parent().closest('.' + this.options.itemClass).length > 0) {
                this.expandItem($(li).parent().closest('.' + this.options.itemClass));
            }
        },
        collapseItem: function (li) {
            this.nestableListObj.collapseItem(li);
        },
        expandAll: function () {
            this.nestableListObj.expandAll();
        },
        collapseAll: function () {
            this.nestableListObj.collapseAll();
        },
        toggleSelected: function (handle) {
            var me = this;
            var itemSelector = '.' + me.options.itemClass;
            var item = $(handle).closest(itemSelector);

            if ($(item).hasClass(this.options.selectedClass)) {
                $(item).removeClass(this.options.selectedClass);
                $(item).find(itemSelector).removeClass(this.options.selectedClass);
            } else {
                $(item).addClass(this.options.selectedClass);
                $(item).find(itemSelector).addClass(this.options.selectedClass);
            }
        }
    };

    $.fn.extend({
        brightNestable: function (params) {
            var plugin = $(this).data("nestable");

            if (!plugin) {
                $(this).data("nestable", new brightNestable(this, params));
                $(this).data("nestable-id", new Date().getTime());
            } else {
                if (typeof params === 'string' && typeof plugin[params] === 'function') {
                    retval = plugin[params]();
                }
            }
        }
    });
})(jQuery);