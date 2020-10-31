import React from "react";
import HomePresenter from "./HomePresenter";
import { movieApi } from "../../api";

// 동적 데이터를 다루므로 클래스형 컴포넌트로 선언
export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  // 화면에 JSX가 렌더링된 직후 호출
  async componentDidMount() {
    try {
      // 1. api를 호출하여 데이터를 로드
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: popular },
      } = await movieApi.popular();

      // 2. 받은 데이터를 state에 저장
      this.setState({ nowPlaying, upcoming, popular });
    } catch {
      this.setState({ error: "Can't find movie data." });
    } finally {
      this.setState({ loading: false });
    }
  }

  // 화면에 렌더링할 JSX를 반환
  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
