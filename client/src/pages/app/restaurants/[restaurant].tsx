import { Title } from '../../../components/Title'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { RestaurantAtom } from '../../../atoms/Atoms'
import { restaurant } from '../../../styled'


export default () => {
  const { query: { restaurant: restaurantName } } = useRouter()

  const restaurantInfo = useRecoilValue(RestaurantAtom)

  const [animate, setAnimate] = useState(false)

  const defaultEvent = "We'll be hosting a mukbang conference every Monday! Meet one of the most knowledgeable mukbang coaches!"
  const tempReviews = [
    { img: 'https://images.unsplash.com/photo-1520811075669-911d3e898760?ixlib=rb-1.2.1&q=80&auto=format&fit=facearea&facepad=2.5&w=500&h=500', name: 'Jessica', content: "I had a great time eating here! I love local cusine, and the happy hour menu is well priced too. I got the Scrumbone with fries and you get a lot of leftovers! And if you don't want fries, you can order a chicken salad! I think this place was a good happy hour deal." },
    { img: 'https://images.unsplash.com/photo-1506919258185-6078bba55d2a?ixlib=rb-1.2.1&q=80&auto=format&fit=facearea&facepad=2.5&w=500&h=500', name: 'Robert', content: "This is one of my fave restaurants! I have been wanting to try this place since I started going to this little Italian, friendly, family restaurant a few years ago, and finally did! I got the eggplant parmigiana and we also ordered the lasagna. Everything was fresh and delicious, the only thing that didn't feel fresh was the lasagna, but the eggplant parmigiana was also okay. The dish had amazing tomato and cream sauce (you can usually add your own tomato), a lot of spinach, and some interesting taste. And the sauce was extra thick, so that it really makes you feel like you're eating a big bowl of lasagna. It was pretty filling and not too hard. The garlic bread was good." },
    { img: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&q=80&auto=format&fit=facearea&facepad=2.5&w=500&h=500', name: 'Sarah', content: "This restaurant serves the tastiest food I've ever had! Always fresh and homemade. My husbands friends often ask where I got my food from. I make sure to tell them we go to Tumbleweed cause the food is fresh! I bring all of my guys here because they like it." }
  ]

  return  (
    <>
    <Title>{`${restaurantName}`}</Title>
    <restaurant.container>
      <restaurant.banner>
        <restaurant.header>{restaurantName}</restaurant.header>
      </restaurant.banner>
      <restaurant.details>
        <restaurant.detailContainer>
          <restaurant.label>Pictures</restaurant.label>
          <restaurant.pictureGrid>
            <restaurant.mainImg src={restaurantInfo?.img ?? `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80`} />
            <restaurant.subImg1 src={`https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80`} />
            <restaurant.subImg2 src={`https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80`} />
          </restaurant.pictureGrid>
        </restaurant.detailContainer>
        <restaurant.detailContainer>
          <restaurant.label>Events</restaurant.label>
          <restaurant.sheetItemEvent>
            <restaurant.sheetItemEventInfo>{restaurantInfo?.event ?? defaultEvent}</restaurant.sheetItemEventInfo>
            <restaurant.sheetItemEventButton
              onTap={_ => setAnimate(true)}
              initial={{ backgroundColor: '#FFF', color: '#6988F2' }}
              animate={ animate ? { backgroundColor: '#6988F2', color: '#FFF' } : { backgroundColor: '#FFF', color: '#6988F2' }}
              transition={restaurant.transition}
            >
              {animate ? '✅' : 'RSVP'}
            </restaurant.sheetItemEventButton>
          </restaurant.sheetItemEvent>
        </restaurant.detailContainer>
        <restaurant.detailContainer>
          <restaurant.label>Reviews</restaurant.label>
          <restaurant.reviewList>
            {restaurantInfo?.reviews.length ? restaurantInfo.reviews.map(({ user: { name, imageURL: img }, text: content },i) =>
              <restaurant.review key={i}>
                <restaurant.reviewImg src={img ?? 'https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/514f6997a318/assets/img/default_avatars/user_60_square.png'} />
                <restaurant.reviewerName>{name}</restaurant.reviewerName>
                <restaurant.reviewText>{content}</restaurant.reviewText>
              </restaurant.review>
              )
              :
              tempReviews.map(({ img, name, content },i) =>
                <restaurant.review key={i}>
                  <restaurant.reviewImg src={img} />
                  <restaurant.reviewerName>{name}</restaurant.reviewerName>
                  <restaurant.reviewText>{content}</restaurant.reviewText>
                </restaurant.review>
            )}
          </restaurant.reviewList>
        </restaurant.detailContainer>
      </restaurant.details>
    </restaurant.container>
    </>
  )
}
