import React from "react";
import HomePresenter from "./HomePresenter";

// 동적 데이터를 다루므로 클래스형 컴포넌트로 선언
export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

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
