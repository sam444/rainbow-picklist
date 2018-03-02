import { Param, Component } from "rainbowui-core";
import { Util } from 'rainbow-foundation-tools';
import "../plugin/jqueryPicklist/jquery.ui.widget.js";
import "../plugin/jqueryPicklist/jquery-picklist.js";
import "../plugin/jqueryPicklist/jquery-picklist.css";
import PropTypes from 'prop-types';

export default class Picklist extends Component {


	componentDidMount() {
		this.handlerComponent();


	}

	componentWillMount() {
		super.componentWillMount();
	}

	componentWillUpdate() {
		const { dataSource } = this.props;
		$("#" + this.componentId).siblings(".pickList").find(".pickList_listItem").remove()
		$("#" + this.componentId + " option").remove()
		$("#" + this.componentId).pickList("insertItems", dataSource);

	}

	static getPickedValue(picklistId) {
		return $("#" + picklistId).val();
	}

	afterAddFun(event) {

		let { model, property, afterAdd } = this.props
		let selectedData = $("#" + event.target.id + " [selected ='selected']")
		let result = []
		if (model && property) {
			selectedData.each((ele) => {
				result.push({ value: selectedData[ele].value, label: selectedData[ele].text })
			})
		}
		model[property] = result

		if (afterAdd) {
			afterAdd(event);
		}

	}

	afterAddAllFun(event) {
		let { dataSource, model, property, afterAdd, afterAddAll } = this.props

		if (model && property) {
			model[property] = dataSource
		}
		if (afterAddAll) {
			afterAddAll(event)
		}
	}

	afterRemoveFun(event) {
		let { model, property, afterRemove } = this.props
		let selectedData = $("#" + event.target.id + " [selected ='selected']")
		let result = []
		if (model && property) {
			selectedData.each((ele) => {
				result.push({ value: selectedData[ele].value, label: selectedData[ele].text })
			})
		}
		model[property] = result

		if (afterRemove) {
			afterRemove(event);
		}
	}

	afterRemoveAllFun(event) {
		let { dataSource, model, property, afterAdd, afterRemoveAll } = this.props

		if (model && property) {
			model[property] = []
		}
		if (afterRemoveAll) {
			afterRemoveAll(event)
		}
	}

	handlerComponent() {
		//todo:这里修改为this的方法

		const { dataSource, sourceListLabel, targetListLabel, addAllLabel, addLabel, removeAllLabel, removeLabel, sortAttribute, beforeBuild, afterBuild, beforePopulate, afterPopulate, beforeAddAll, beforeAdd, beforeRemove, beforeRemoveAll, beforeRefresh, afterRefresh, beforeRefreshControls, afterRefreshControls, onDestroy } = this.props;
		let afterAdd = this.afterAddFun.bind(this);
		let afterAddAll = this.afterAddAllFun.bind(this);
		let afterRemove = this.afterRemoveFun.bind(this);
		let afterRemoveAll = this.afterRemoveAllFun.bind(this);

		const pickListId = this.componentId
		$("#" + this.componentId).pickList(
			{
				id: pickListId,
				sourceListLabel: sourceListLabel,
				targetListLabel: targetListLabel,
				addAllLabel: addAllLabel,
				addLabel: addLabel,
				removeAllLabel: removeAllLabel,
				removeLabel: removeLabel,
				sortAttribute: sortAttribute,
				items: dataSource,
				beforeBuild: beforeBuild,
				afterBuild: afterBuild,
				beforePopulate: beforePopulate,
				afterPopulate: afterPopulate,
				beforeAddAll: beforeAddAll,
				afterAddAll: afterAddAll,
				beforeAdd: beforeAdd,
				afterAdd: afterAdd,
				beforeRemove: beforeRemove,
				afterRemove: afterRemove,
				beforeRemoveAll: beforeRemoveAll,
				afterRemoveAll: afterRemoveAll,
				beforeRefresh: beforeRefresh,
				afterRefresh: afterRefresh,
				beforeRefreshControls: beforeRefreshControls,
				afterRefreshControls: afterRefreshControls,
				onDestroy: onDestroy
			});
	}

	render() {
		const { multiple, style } = this.props;
		return (
			<div>
				<select id={this.componentId} name={this.componentId} multiple={multiple} style={style}>
				</select>
			</div>
		)
	}
}

Picklist.propTypes = $.extend({}, Component.propTypes, {
	id: PropTypes.string,
	value: PropTypes.object,
	dataSource: PropTypes.array,
	style: PropTypes.string,
	multiple: PropTypes.string,
	beforeBuild: PropTypes.func,
	afterBuild: PropTypes.func,
	beforePopulate: PropTypes.func,
	afterPopulate: PropTypes.func,
	beforeAddAll: PropTypes.func,
	afterAddAll: PropTypes.func,
	beforeAdd: PropTypes.func,
	afterAdd: PropTypes.func,
	beforeRemove: PropTypes.func,
	afterRemove: PropTypes.func,
	beforeRemoveAll: PropTypes.func,
	afterRemoveAll: PropTypes.func,
	beforeRefresh: PropTypes.func,
	afterRefresh: PropTypes.func,
	beforeRefreshControls: PropTypes.func,
	afterRefreshControls: PropTypes.func,
	onDestroy: PropTypes.func
})

Picklist.defaultProps = $.extend({}, Component.defaultProps, {
	sourceListLabel: "NoAdded",
	targetListLabel: "Added",
	addAllLabel: "Add All",
	addLabel: "Add",
	removeAllLabel: "Remove All",
	removeLabel: "Remove",
	sortAttribute: "value",
	multiple: "multiple",
	style: {}
	// beforeBuild: function () { },
	// afterBuild: function () { },
	// beforePopulate: function () { },
	// afterPopulate: function () { },
	// beforeAddAll: function () { },
	// afterAddAll: function () { },
	// beforeAdd: function () { },
	// afterAdd: function () { },
	// beforeRemove: function () { },
	// afterRemove: function () { },
	// beforeRemoveAll: function () { },
	// afterRemoveAll: function () { },
	// beforeRefresh: function () { },
	// afterRefresh: function () { },
	// beforeRefreshControls: function () { },
	// afterRefreshControls: function () { },
	// onDestroy: function () { }

})