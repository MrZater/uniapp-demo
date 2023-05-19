<template>
	<view class="article-detail-container">
		<!-- 标题 -->
		<view class="detail-title">
			{{ articleData.title }}
		</view>
		<!-- 头部信息 -->
		<view class="detail-header">
			<view class="detail-logo">
				<image :src="articleData.author.avatar" mode=""></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{ articleData.author.author_name }}
				</view>
				<view class="detail-header-content-info">
					<text>{{ articleData.create_time }}</text>
					<text>{{ articleData.browse_count }}浏览</text>
					<text>{{ articleData.thumbs_up_count }}赞</text>
				</view>
			</view>
			<button type="default" class="detail-header-btn">取消关注</button>
		</view>
		<!-- 文章内容 -->
		<view class="detail-content-container">
			<view class="detail-html" v-if="articleData.content">
				<u-parse :content="articleData.content"></u-parse>
			</view>
			<!-- 评论内容 -->
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view v-for="(item,index) in commentList" :key="index" class="comment-content-container">
					<CommentBox :commentData='item' @commentReply='commentReply'></CommentBox>
				</view>
				<view v-if="!commentList.length" class="no-data">
					暂无评论！
				</view>
			</view>
		</view>
		<!-- 评论组件 -->
		<view class="detail-bottom">
			<view class="input-container" @click="changeShowPopup">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" color="#f07373" size="16"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icon-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icon-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom-icon-box">
					<uni-icons type="hand-up" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<CommentMasker :showPopup='showPopup' @closePopup='showPopup=false' @sendCommentData='sendCommentData'>
		</CommentMasker>
	</view>
</template>

<script>
	import uParse from "@/components/u-parse/u-parse.vue";
	import {
		marked
	} from "marked";
	export default {
		components: {
			uParse,
		},
		data() {
			return {
				articleData: null,
				showPopup: false,
				commentList: [],
				replyData: {}
			};
		},
		onLoad(...options) {
			this.articleData = JSON.parse(options[0].params);
			this._getArticleDetail(this.articleData._id);
			// 初始化获取评论列表
			this._getCommentList()
		},
		methods: {
			async changeShowPopup() {
				await this.checkedIsLogin()
				this.showPopup = !this.showPopup
			},
			async _getArticleDetail(id) {
				const {
					data
				} = await this.$http.get_article_detail({
					article_id: id,
				});
				this.articleData = data;
				this.articleData.content = marked(this.articleData.content)
			},
			async sendCommentData(val) {
				const res = await this.$http.update_comment({
					user_id: this.userInfo._id,
					article_id: this.articleData._id,
					content: val,
					...this.replyData
				})
				this.showPopup = false
				this.replyData = {}
				this._getCommentList()
			},
			async _getCommentList() {
				const res = await this.$http.get_comment({
					article_id: this.articleData._id
				})
				this.commentList = res.data
			},
			commentReply(data) {
				this.replyData = {
					comment_id: data.comment.comment_id,
					is_reply:data.isReply
				}
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
				this.changeShowPopup()
			}
		},
	};
</script>

<style lang="scss">
	@import "./css/articleDetail.scss";
</style>