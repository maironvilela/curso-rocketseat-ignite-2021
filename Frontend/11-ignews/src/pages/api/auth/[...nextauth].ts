/* eslint-disable prettier/prettier */
import {
  query as q
} from 'faunadb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { fauna } from '../../../services/faunaDB';

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GIT_HUB_CLIENT_ID,
      clientSecret: process.env.GIT_HUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index('find_by_email'), q.Casefold(email))),
            ),
            q.Create(q.Collection('users'), {
              data: {
                email,
              },
            }),
            q.Get(q.Match(q.Index('find_by_email'), q.Casefold(email))),
          ),
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },


    async session({session}){
      // Verificar se o usuário possui uma sessão ativa
      try {
         await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('find_by_subscription_user_id'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('find_by_email'),
                      q.Casefold(session.user.email)
                    )
                  ),
                )
              ),
              q.Match(
                q.Index('find_subscription_by_status'), 'active'
              )
            ]
            )
          )
        )
        return {
          ...session,
          isSubscriptionActive: true,
        };
      } catch (err){
        return {
          ...session,
          isSubscriptionActive: false,
        };
      }
    }
  },
});
