import { Title } from '../../components/Title'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { ProfileAtom } from '../../atoms/Atoms'
import { profile } from '../../styled'
import { food } from '../../svg'

export default () => {
  const profileInfo = useRecoilValue(ProfileAtom)

  return (
    <>
    <Title>My Profile</Title>
    <profile.container>
      <profile.banner>
        <Link href='/app/other/help'>
          <profile.helpIcon
            whileTap={{ scale: 0.8 }}
            viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </profile.helpIcon>
        </Link>
        <a href='/api/logout'>
          <profile.logoutIcon
            whileTap={{ scale: 0.8 }}
            viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </profile.logoutIcon>
        </a>
        <profile.picture
          // hardcoded style
          style={(profileInfo?.id === 417) ? { objectPosition: 'center' } : {} }
          src={profileInfo?.profilePicture} />
        <profile.bar>
          <profile.name>{profileInfo?.firstName}</profile.name>
          <profile.actions>
            <profile.actionButton>
              <Link href='/signup'>
                <profile.actionIcon viewBox="0 0 300 300">
                  <path d="M211.39,39.5l49.1,49.08a23.14,23.14,0,1,0,32.73-32.72L244.12,6.78A23.14,23.14,0,0,0,211.39,39.5Z"/>
                  <path d="M250.27,98.79l-50.5-50.48-.07.07a23.15,23.15,0,0,0-31.27,1.33L6.77,211.31A23,23,0,0,0,.13,230.09v43.66h.1a23.09,23.09,0,0,0,26.15,25.86V300h46.3v-.16a23.09,23.09,0,0,0,15.9-6.76l0,0,161.66-161.6A23.13,23.13,0,0,0,250.27,98.79ZM62.54,253.73H46.42V237.12L184.8,98.79l16.37,16.36Z"/>
                </profile.actionIcon>
              </Link>
            </profile.actionButton>
          </profile.actions>
        </profile.bar>
      </profile.banner>
      <profile.details>
        <profile.detailContainer>
          <profile.label>Bio</profile.label>
          <profile.description>{profileInfo?.bio}</profile.description>
        </profile.detailContainer>
        <profile.detailContainer>
          <profile.label>Favourites</profile.label>
          <profile.foodRow>
            <food.sushi as={profile.foodIcon} />
            <food.burger as={profile.foodIcon} />
            <food.vegan as={profile.foodIcon} />
          </profile.foodRow>
        </profile.detailContainer>
        <profile.detailContainer>
          <profile.label>Eating Styles</profile.label>
          <profile.hashtagRow>
            <profile.hashtag>#SweetTooth</profile.hashtag>
            <profile.hashtag>#Gourmet</profile.hashtag>
            <profile.hashtag>#Speedy</profile.hashtag>
            <profile.hashtag>#HeatEnthusiast</profile.hashtag>
            <profile.hashtag>#JackOfAllTrades</profile.hashtag>
            <profile.hashtag>#FierceEater</profile.hashtag>
            <profile.hashtag>#Hangry</profile.hashtag>
          </profile.hashtagRow>
        </profile.detailContainer>
      </profile.details>
    </profile.container>
    </>
  )
}
