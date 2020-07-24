import { Title } from '../../components/Title'
import Link from 'next/link'
import { nearby } from '../../styled'
import { food } from '../../svg'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { PeopleAtom, PersonAtom } from '../../atoms/Atoms'

export default () => {
  const people = useRecoilValue(PeopleAtom)
  const setPerson = useSetRecoilState(PersonAtom)

  return (
    <>
    <Title>Nearby</Title>
    <nearby.container>
      <nearby.categories>
        <nearby.food>
          <nearby.label>Cuisine</nearby.label>
          <nearby.foodRow>
            <food.breakfast as={nearby.foodIcon} />
            <food.burger as={nearby.foodIcon} />
            <food.vegan as={nearby.foodIcon} />
            <food.pizza as={nearby.foodIcon} />
            <food.sushi as={nearby.foodIcon} />
            <food.ramen as={nearby.foodIcon} />
          </nearby.foodRow>
        </nearby.food>
        <nearby.people>
          <nearby.label>Who's Nearby</nearby.label>
          <nearby.peopleGrid>
          {people?.length ?
            people.map(({ id, firstName, profilePicture },i) =>
              <Link
                href='/app/people/[person]'
                as={`/app/people/${id}`}
                key={i} >
                <nearby.person
                  onClick={_ => setPerson({ firstName, profilePicture })}
                  src={profilePicture} />
              </Link>
            )
            :
            [...Array(30)].map( (_,i) =>
              <nearby.personPlaceholder key={i} />
            )
          }
          </nearby.peopleGrid>
        </nearby.people>
      </nearby.categories>
    </nearby.container>
    </>
  )
}
