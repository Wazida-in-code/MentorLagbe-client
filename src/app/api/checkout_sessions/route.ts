// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'
// import { stripe } from '@/lib/stripe';
// import { getSession } from '@/lib/server';

// export async function POST() {
//     const userSession = await getSession()
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: 'price_1UeCVb13qXwKc644qiQXgzxf',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       customer_email: userSession?.user.email,
//       metadata: {
//         userId: userSession?.user.id ?? null,
//         userName: userSession?.user.name as string
//       },
//       success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
//       // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
//       integration_identifier: 'mentor_lagbe_A9_web',
//     });
//     return NextResponse.redirect(session.url as string, 303)
//   } catch (err) {
//     const error = err instanceof Error ? err : new Error(String(err))
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getSession } from '@/lib/server';

const PRICES: Record<string, number> = {
  student: 1000, // $10 (cents)
  tutor: 1500,   // $15 (cents)
};

export async function POST() {
  try {
    const userSession = await getSession()
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = userSession.user.role as string
    const amount = PRICES[role]
    if (!amount) {
      return NextResponse.json({ error: 'Role not eligible' }, { status: 400 })
    }

    const headersList = await headers()
    const origin = headersList.get('origin')

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: { name: `Upgrade (${role})` },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userSession.user.email,
      metadata: {
        userId: userSession.user.id,
        userName: userSession.user.name as string,
        userEmail: userSession.user.email ,
        userRole: userSession.user.role,
        userPlan: userSession.user.plan,
        userAmount: amount
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      integration_identifier: 'mentor_lagbe_A9_web',
    });
    return NextResponse.redirect(session.url as string, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}