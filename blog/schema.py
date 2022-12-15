# import graphene
# from grapple.types.structures import BasePaginatedType
#
# from blog.models import BlogPostPage
#
# # make a paginated type for Blog Post Page using BasePaginatedType
# class BlogPostPageType(BasePaginatedType):
#     class Meta:
#         model = BlogPostPage
#
#
#
# class BlogPostsQuery:
#     blog_posts = graphene.List()
#
#     # noinspection PyMethodMayBeStatic
#     def resolve_auth_user(self, info):
#         user = info.context.user
#         if user.is_anonymous:
#             raise Exception('Not logged in!')
#
#         return user
