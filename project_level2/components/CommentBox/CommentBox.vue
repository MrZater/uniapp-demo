<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="commentData.author.avatar" mode=""></image>
			</view>
			<view class="comment-info">
				<view class="title" v-if="!commentData.is_reply">
					{{commentData.author.author_name}}
				</view>
				<view class="title" v-else>
					{{commentData.author.author_name}}
					<text class="reply-to">回复</text>
					{{commentData.to}}
				</view>
				<view class="">
					<uni-dateformat :date="commentData.create_time" :format="'yyyy-MM-dd hh:mm:ss'"></uni-dateformat>
				</view>
			</view>
		</view>
		<!-- 评论内容展示 -->
		<view class="comment-content">
			<view class="">
				{{commentData.comment_content}}
			</view>
			<view class="comment-info">
				<view class="comment-button" @click="commentReply({comment:commentData,isReply:isReply})">
					回复
				</view>
			</view>
			<!-- 判断是否有子回复 -->
			<view class="comment-reply-list" v-for="(item,index) in commentData.replyArr " :key="item.comment_id">
				<CommentBox :commentData='item' :isReply='true' @commentReply='commentReply'></CommentBox>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CommentBox",

		data() {
			return {

			};
		},
		props: {
			commentData: Object,
			isReply: {
				default: false,
				type: Boolean
			}
		},
		methods: {
			commentReply(data) {
				if(data.isReply){
					data.comment.reply_id = data.comment.comment_id
					data.comment.comment_id = this.commentData.comment_id
				}
				console.log(123);
				this.$emit('commentReply', data)
			}
		}
	}
</script>

<style lang="scss">
	@import './css/commentBox.scss';
</style>