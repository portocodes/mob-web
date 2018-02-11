import "./styles";
import "./styles.responsive";

import React, { Component } from "react";
import { compose } from "recompose";
import { Link } from "react-router";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { values } from "lodash";
import ReactTooltip from "react-tooltip";
import classnames from "classnames";

//
// Components
import {
  Button,
  ErrorMessage,
  buttonPropsFromReduxForm,
} from "uikit";

//
// redux
import { fetchMediumPosts } from "actions/posts";

//
// apis
import { getInviteToSlack } from "api/slack";

import { composeValidators, validateEmail } from "validators";

import SPONSORS from "./sponsors";
import { HACKATHON_PRIZES, AI_COMP_PRIZES } from "./prizes";

import slackMarkWhite from "assets/images/slack-white.svg";
import email from "assets/images/email-white.svg";

const validate = (values) => {
  return composeValidators(
    validateEmail("EMAIL", "Email"),
  )(values);
};

export class Landing extends Component {

  componentWillMount() {
    this.props.dispatch(fetchMediumPosts());
  }

  componentDidMount() {
    document.querySelector("#app").addEventListener("scroll", this.hideTooltips);

    const { hash } = window.location;
    if (hash) {
      const node = document.querySelector(hash);
      node && node.scrollIntoView();
    }
  }

  componentWillUnmount() {
    document.querySelector("#app").removeEventListener("scroll", this.hideTooltips);
  }

  subscribe = (ev) => {
    if (!this.props.valid) ev.preventDefault();
  }

  getInvited = ({ EMAIL }) => {
    return getInviteToSlack(EMAIL);
  }

  hideTooltips = () => {
    ReactTooltip.hide();
  }

  render() {
    const { handleSubmit } = this.props;
    const posts = values(this.props.posts).slice(0, 2);

    return (
      <div className="Landing">
        <div className="LandingHero">
          <div className="content">
            <h2>April 13, 14, 15 &sdot; 2018</h2>
            <h1>Create, code, and learn <br />with us in Porto</h1>
            <h3>Join us in the playground for the future</h3>

            <Link to="/signup">
              <Button straight large outline purple>Apply Now</Button>
            </Link>
          </div>
        </div>

        {/* Hackathon */}
        <section id="hackathon">
          <div className="content">
            <h1>Hackathon</h1>
            <h2>First you make, then you break</h2>

            <p>Make or Break has a 3 day hackathon for everyone, divided into 2 main phases:</p>
            <ul>
              <li>Make: 2 days to develop a software project (maybe add some hardware 🤓)</li>
              <li>Break: showcase your project to all participants in a small fair</li>
            </ul>
            <p>Apply and experiment with a new idea to win amazing prizes! (one per member of each category’s winning team)</p>
            <p>We've got great mentors, food, and a kickass chill-out zone!</p>

            <a href="/rules" target="_blank" rel="noreferrer noopener">
              <Button straight large outline cyan>Regulation</Button>
            </a>
          </div>
        </section>
        {/* END Hackathon */}

        <section id="prizes">
          <div className="content">
            <h1>Prizes</h1>
            <h2>One per member of each category’s winning team</h2>

            <ul className="prizes">
              {HACKATHON_PRIZES.map(prize => (
                <li key={prize.subtitle} className="prize">
                  <img src={prize.image} alt={prize.subtitle} />
                  <h3>{prize.title}</h3>
                  <h4>{prize.subtitle}</h4>
                  <p>{prize.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Workshops */}
        <section id="workshops">
          <div className="content">
            <h1>Workshops</h1>
            <h2>Come learn with us!</h2>

            <p>Make or Break is all about learning. Step out of your comfort zone and join us and many other developers. We'll feature a wide variety of experts and subjects so you can learn a bit of everything.</p>
            <p><i>Workshops will be announced soon.</i></p>

          </div>
        </section>
        {/* END Workshops */}

        {/* AI Competition */}
        <section id="ai-competition">
          <div className="content">
            <h1>AI Competition</h1>
            <h2>One bot to rule the board!</h2>

            <p>
              Starting March 2018 we will host an AI competition. You will be able to start experimenting during February.
              <br />
              The goal is to create an AI agent capable of playing a simple board game created for the competition.
              <br />
              You can develop it in a programming language of your choice (supported languages to be announced soon).
            </p>
            <p>
              Hop on to our rules page to know more!
            </p>

            <a href="/ai-regulation" target="_blank" rel="noopener noreferrer">
              <Button straight large outline cyan>Regulation (WIP)</Button>
            </a>

            <ul className="prizes">
              {AI_COMP_PRIZES.map(prize => (
                <li key={prize.title} className="prize">
                  <img src={prize.image} alt={prize.subtitle} />
                  <div>
                    <h3>{prize.title}</h3>
                    <h4>{prize.subtitle.split("\n").map((line, i) => (<div key={i}>{line}</div>))}</h4>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* END AI Competition */}

        {/* Separator */}
        <section id="separator">
          <div className="content">
            <h1>A<br/>Different<br />Kind of<br />Hackathon</h1>
          </div>
        </section>
        {/* END Separator */}

        {/* Previous edition */}
        <section id="previous-edition">
          <div className="content">
            <h1>Check out MoB's<br />last edition</h1>
            <h2>Returning April 2018!</h2>

            <Link to="/signup">
              <Button straight large outline yellow>Apply Now</Button>
            </Link>

            <div className="video">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/r0FrR0MOvc4" frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
            </div>
          </div>
        </section>
        {/* END Previous edition */}

        {/* Community */}
        <section id="community">
          <div className="gradient-bg" />

          <div className="content">

            <h1>It's dangerous<br />to go alone!</h1>
            <p>
              You can't participate in the Make or Break hackathon <a href="/rules#participation" target="_blank" rel="noreferrer noopener">by yourself.</a>
              <br />
              Join our Slack community and form a team with other participants.
              <br />
              <br />
              Get your invite here:
            </p>

            <form onSubmit={this.subscribe} name="mc-embedded-subscribe-form" action="//portosummerofcode.us8.list-manage.com/subscribe/post?u=1b6e195ef5bf93f16b5c4c5a4&amp;id=c59d1784a4" method="post" target="_blank">
              <Field id="email" name="EMAIL" component="input" type="text" placeholder="Email address" className="fullwidth" />
              <ErrorMessage form="slackInvite" field="email" />

              <div style={{ position: "absolute", left: -5000 + "px" }} aria-hidden="true">
                <input type="text" name="b_1b6e195ef5bf93f16b5c4c5a4_c59d1784a4" tabIndex="-1" value="" />
              </div>

              <Button
                type="button"
                pink
                large
                { ...buttonPropsFromReduxForm(this.props) }
                feedbackSuccessLabel="Invite sent!"
                feedbackFailureLabel="Already invited"
                onClick={handleSubmit(this.getInvited)}
              >
                Get invited to our Slack
                <img src={slackMarkWhite} width="20" />
              </Button>

              <Button
                type="submit"
                pink
                large
                name="subscribe"
              >
                Subscribe to our newsletter
                <img src={email} width="20" />
              </Button>
              <div>
                <ErrorMessage form="landing" field="EMAIL" />
              </div>
            </form>

          </div>
        </section>
        {/* END Community */}

        {/* Team Separator */}
        <section id="team-separator">
          <div className="content">
            <h1>
              Learn, join<br />
              forces and<br />
              develop<br />
              amazing<br />
              things<br />
            </h1>
          </div>
        </section>
        {/* END Team Separator */}

        {/* News */}
        {posts.length > 0 &&
          <section id="news">
            <div className="content">
              <h1>Latest news</h1>

              {posts.map(post => (
                <div key={post.id} className="news-box">
                  <div
                    className={classnames("image", { empty: post.virtuals.previewImage.imageId.length === 0 })}
                    style={{ backgroundImage: `url(https://cdn-images-1.medium.com/max/430/${post.virtuals.previewImage.imageId})` }}
                  />

                  <h3>{post.title}</h3>

                  <p>{post.content.subtitle}</p>

                  <a href={`https://medium.com/makeorbreak-io/${post.uniqueSlug}`} target="_blank" rel="noopener noreferrer">
                    <Button straight outline large yellow>Read More</Button>
                  </a>
                </div>
              ))}
            </div>
          </section>
        }
        {/* END News */}

        {/* Sponsors */}
        <section id="sponsors">
          <div className="content">
            <h1>Sponsors</h1>
            <h2>We have some amazing sponsors</h2>

            <div className="sponsors">
              {SPONSORS.map((group, i) => (
                <ul key={i} className="sponsor-list">
                  {group.map(({ src, url, className, description }) => (
                    <li
                      id={className}
                      key={className}
                      className={className}
                      data-tip={description}
                      onMouseLeave={this.hideTooltips}
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={src} />
                      </a>
                    </li>
                  ))}
                </ul>
              ))}

              <a href="mailto:info@makeorbreak.io?subject=MoB 2018 sponsorship" rel="noopener noreferrer" target="_blank">
                <Button straight outline large purple>Become a sponsor</Button>
              </a>
            </div>
          </div>
        </section>
        {/* END Sponsors */}

        {/* MoB Sessions */}
        <section id="mob-sessions">
          <div className="content">
          </div>
        </section>
        {/* END MoB Sessions */}

        <ReactTooltip
          effect="solid"
          event="mouseover"
          eventOff="click"
          className="sponsor-tooltip"
          html
        />

      </div>
    );
  }

}

export default compose(
  reduxForm({
    form: "landing",
    validate,
  }),

  connect(({ posts }) => ({ posts })),
)(Landing);
