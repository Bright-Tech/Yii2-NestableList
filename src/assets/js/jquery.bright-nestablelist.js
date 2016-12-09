/**
 * Created by SamXiao on 2016/10/4.
 */
var BrightNestableList = {
    /**
     * nestable list 句柄，用于存储已初始化的 nestable list 实例
     */
    NestableListHandler: [],
    NestableListOptions: [],
    selectable: false,
    /**
     *
     * @param selector
     */
    initNestableList: function (selector) {
        if (!selector) {
            selector = '.dd';
        }
        var me = this;
        var handler = jQuery(selector).nestable(me.NestableListOptions);
        if (me.NestableListOptions.collapseAll == 1) {
            handler.nestable('collapseAll');
        }
        me.NestableListHandler[selector] = handler;
        me.bindEvents(selector);
    },
    bindEvents: function (selector) {
        var me = this;
        if (me.selectable) {
            var handleSelector = '.dd-handle';
            $(selector).on('click', handleSelector, function (e) {
                var item = this;
                me.toggleItem(item);
            });
        }
    },
    expandItem: function (li, selector) {
        if (!selector) {
            selector = '.dd';
        }
        var me = this;
        var handler = me.NestableListHandler[selector];
        var itemSelector = '.' + me.NestableListOptions['itemClass'];
        handler.data("nestable").expandItem(li);
        if ($(li).parent().closest(itemSelector).length > 0) {
            console.log($(li).parent().closest(itemSelector));
            me.expandItem($(li).parent().closest(itemSelector));
        }
    },
    collapseItem: function (li) {
        jQuery(selector).nestable('collapseItem', li);
    },

    /**
     * 切换选中状态
     */
    toggleItem: function (handle) {
        var me = this;
        var itemSelector = '.' + me.NestableListOptions['itemClass'];
        var item = $(handle).closest(itemSelector);

        if ($(item).hasClass('dd-selected')) {
            $(item).removeClass('dd-selected');
            $(item).find(itemSelector).removeClass('dd-selected');
        } else {
            $(item).addClass('dd-selected');
            $(item).find(itemSelector).addClass('dd-selected');
        }


    }


};


(function ($) {

    var defaults = {
        collapseAllAtBegin: false,
        draggable: false,

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
            this.nestableListObj = $(this.el).nestable(this.options);

        },
        reset: function () {
            this.nestableListObj.reset();
        },
        expandItem: function () {
            this.nestableListObj.expandItem();
        },
        collapseItem: function () {

        },
        expandAll: function () {

        },
        collapseAll: function () {

        },
        expandItem: function () {

        },
        dragStart: function (e) {
            if (this.options.dragable) {
                this.nestableListObj.dragStart(e)
            }
        },
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