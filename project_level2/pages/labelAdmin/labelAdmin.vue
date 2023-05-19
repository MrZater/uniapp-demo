<template>
	<view class="label-admin-container">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					我的标签
				</view>
				<view class="label-edit" @click="changeEditStatus">
					{{ !isEdit?'编辑':'完成'}}
				</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="(item, index) in selfLabelList" :key="item._id">
					{{item.name}}
					<uni-icons v-if="isEdit" class="icon-close" type="clear" size='20' color="red"
						@click="deleteLabelItem(item)"></uni-icons>
				</view>
				<view v-if="!selfLabelList.length" class="no-data">
					当前无数据
				</view>
			</view>
		</view>
		<!-- 标签推荐 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					标签推荐
				</view>
			</view>
			<view class="label-content">
				<view @click="changeSelfLabelList(item)" class="label-content-item"
					v-for="(item,index) in recommendLabelList" :key="item._id">
					{{item.name}}
				</view>
				<view v-if="!recommendLabelList.length" class="no-data">
					当前无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				isEdit: false,
				labelIds: []
			}
		},
		watch: {
			userInfo: {
				handler(val) {
					this.labelIds = this.userInfo.label_ids || []
				},
				immediate: true
			}
		},
		computed: {
			...mapState(['labelList']),
			selfLabelList() {
				return this.labelList.filter(item => this.labelIds.includes(item._id))
			},
			recommendLabelList() {
				return this.labelList.filter(item => !this.labelIds.includes(item._id) && item._id)
			}
		},
		methods: {
			changeEditStatus() {
				this.isEdit = !this.isEdit
				if (!this.isEdit) {
					this._updateLabel()
				}
			},
			async _updateLabel() {
				// user信息
				// 新的labelids集合
				const label_ids = this.selfLabelList.map(item => item._id)
				const res = await this.$http.update_label_ids({
					userId: this.userInfo._id,
					label_ids
				})
				if (res.code === 200) {
					uni.showToast({
						title: res.data.msg
					})
					this.updateUserInfo({...this.userInfo,label_ids})
				}
			},
			changeSelfLabelList(item) {
				if (!this.isEdit) return
				this.labelIds.push(item._id)
			},
			deleteLabelItem(item) {
				this.labelIds = this.labelIds.filter(id => item._id !== id)
			}
		}
	}
</script>

<style lang="scss">
	@import './css/labelAdmin.scss';
</style>