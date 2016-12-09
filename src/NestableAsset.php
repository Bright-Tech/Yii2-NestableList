<?php
/**
 * @author Sam Xiao
 */
namespace bright_tech\yii2\nestable_list;

use yii\web\AssetBundle;

/**
 *
 * @author
 * @since
 */
class NestableAsset extends AssetBundle
{

    public $sourcePath = '@vendor/bright-tech/yii2-nestable-list/src/assets';

    public $css = [
    ];
    
    public $js = [
        'js/jquery.bright-nestablelist.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset'
    ];
}
