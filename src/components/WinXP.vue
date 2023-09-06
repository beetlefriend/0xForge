<template>
  <div>
    <div id="app" v-if="!closed && isDesktop">
      <!--  && !showIntro-->
      <div class="container">
        <div class="desktop-icons">
          <div class="desktop-icon" @click="openWinamp">
            <img
              width="100px"
              src="https://pawelporwisz.pl/winamp/img/wip/wi.png"
            />
            <p>Winamp.exe</p>
          </div>
          <div class="desktop-icon" @click="openPurposeWindow">
            <img width="100px" src="../assets/icon.png" />
            <p>About.txt</p>
          </div>
          <div class="desktop-icon" @click="openRoadmapWindow">
            <img width="100px" src="../assets/icon.png" />
            <p>Roadmap.txt</p>
          </div>
          <div class="desktop-icon" @click="openTokenomicsWindow">
            <img width="100px" src="../assets/icon.png" />
            <p>Tokenomics.txt</p>
          </div>
          <!-- <div class="desktop-icon" @click="openYeetWindow">
            <img width="100px" src="../assets/logo.png" />
            <p>Yeet.png</p>
          </div> -->
          <div class="desktop-icon" @click="openUniswapWindow">
            <img
              width="100px"
              src="https://cryptologos.cc/logos/uniswap-uni-logo.png"
            />
            <p>Uniswap.exe</p>
          </div>
          <div class="desktop-icon" @click="openSocialsWindow">
            <img width="100px" src="../assets/socials.png" />
            <p>Socials.exe</p>
          </div>
          <div class="desktop-icon" @click="openSuperMario">
            <img width="100px" src="../assets/Mario.png" />
            <p>SM.exe</p>
          </div>
          <!-- <div class="desktop-icon" @click="openTetris">
            <img
              width="100px"
              src="https://static.thenounproject.com/png/28580-200.png"
            />
            <p>Tetris.exe</p>
          </div> -->
          <div class="desktop-icon" @click="openSnake">
            <img
              width="100px"
              src="https://cdn-icons-png.flaticon.com/512/427/427533.png"
            />
            <p>Snake.exe</p>
          </div>

          <div class="desktop-icons-2">
            <div class="desktop-icon" @click="openBin" style="">
              <img
                width="100px"
                src="https://icons-for-free.com/iconfiles/png/512/documents+file+media+movie+video+music+player+icon-1320167010914954734.png"
              />
              <p>YEETDAOS01E01</p>
            </div>
            <!-- </div> -->
            <div class="desktop-icon" @click="openOsOne">
              <img
                width="100px"
                src="https://images.blur.io/_blur-prod/0x5af0d9827e0c53e4799bb226655a1de152a425a5/2575-278b3b16ac9bb634?w=640"
              />
              <p>Milady2575</p>
            </div>
            <!-- <div class="desktop-icon" @click="openOsThree">
              <img
                width="100px"
                src="https://images.blur.io/_blur-prod/0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab/6791-32372e4ab3211cbd?w=640"
              />
              <p>Remilio6791</p>
            </div> -->
            <div class="desktop-icon" @click="openOsFour">
              <img
                width="100px"
                src="https://images.blur.io/_blur-prod/0xf729f878f95548bc7f14b127c96089cf121505f8/115-c61015728f52462c?w=640"
              />
              <p>Anata115</p>
            </div>
            <div class="desktop-icon" @click="openOsTwo">
              <img
                width="100px"
                src="https://images.blur.io/_blur-prod/0x32bb5a147b5371fd901aa4a72b7f82c58a87e36d/1100-6fe78a0604d7ce50?w=640"
              />
              <p>BitBear1100</p>
            </div>
          </div>
          <div class="desktop-icons-3">
            <div class="desktop-icon" @click="openStaking">
              <img
                width="100px"
                src="https://cdn-icons-png.flaticon.com/512/170/170310.png"
              />
              <p>Staking.exe</p>
            </div>
            <div
              class="desktop-icon"
              style="margin-left: 50px"
              @click="openAuction"
            >
              <img
                width="100px"
                src="https://cdn-icons-png.flaticon.com/512/345/345629.png"
              />
              <p>Auction.exe</p>
            </div>
          </div>
        </div>
      </div>

      <Window
        v-for="window in windows"
        :key="window.id"
        :id="window.id"
        :title="window.title"
        :style="{ left: window.x + 'px', top: window.y + 'px' }"
        :focused="window.focus"
        @focus="focusWindow"
      >
        <!-- window content here -->
        <template v-if="window.id === 1">
          <div>
            <v-card elevation="0" color="transparent">
              <v-card-text> /cmd/run/drinkthekoolaid.exe </v-card-text>
              <div class="social-buttons">
                <a href="https://twitter.com/yeet_dao">
                  <v-btn rounded>
                    <img
                      src="../assets/tw.png"
                      alt="Telegram Icon"
                      width="20"
                      height="20"
                    /> </v-btn
                ></a>
                <a href="https://t.me/yeet_dao">
                  <v-btn rounded>
                    <img
                      src="../assets/tg.png"
                      alt="Telegram Icon"
                      width="34"
                      height="34"
                    />
                  </v-btn>
                </a>
              </div>
            </v-card>
          </div>
        </template>

        <template v-if="window.id === 10">
          <div>
            <v-card elevation="0" color="transparent">
              <v-card-text><pre> 3 New files downloaded </pre></v-card-text>
            </v-card>
          </div>
        </template>

        <template v-else-if="window.id === 2">
          <img
            src="../assets/logo.png"
            alt="Logo"
            width="400px"
            style="padding-top: 5px"
          />
        </template>

        <template v-else-if="window.id === 3">
          <v-card width="600" color="transparent" elevation="0">
            <!-- <v-card-title>About</v-card-title> -->
            <v-card-text class="about-text" v-if="showAbout">
              <h3>1. What is YEET DAO?</h3>
              <br />
              <p>
                A project bringing together the best DeFi and NFT communities in
                crypto. A lot of groups in crypto 'just don't have it' - but
                [redacted] and [redacted] do. We want to give back to the
                spheres that keep people around, and look out for any other
                winning teams we might've missed.
              </p>

              <h3>2. Who is YEET DAO?</h3>
              <br />
              <p>
                YEET DAO consists of a team of war-torn veterans who've been in
                the space since 2011. They've seen red candles most people
                couldn't dream up in their worst nightmares. They've received
                liquidation notices via carrier pigeon, only to turn around and
                make it all back again. Now that they're grown and responsible
                adults, they've accepted that the most powerful blockchain
                technology developed so far is a community of token holders who
                don't make you feel embarrassed to be associated with them. Our
                goal is to find as many of these people as possible.
              </p>

              <br />
              <h3>3. Phase 1 of YEET DAO:</h3>

              <br />
              <p>
                The blockchain has a major weakness - value isn't rewarded
                fairly off-chain. Posters who bring the most to a community
                aren't compensated unless they've already secured equity.
                Unfortunately, most power-posters are completely broke; this is
                likely related to how they have time to shitpost all day. This
                means they rarely hold much of the asset they're promoting, and
                they see almost no return for their community-building efforts.
                Our goal is simple: fix this. By giving valuable community
                members stake in the communities they're representing, we
                accomplish 2 things: Pump your bags. If you think the NEETs are
                good at shilling your bags now, how good do you think they'd be
                if they had bags of their own? Retain your talent. Value needs
                to be rewarded. If you don't pay the community members who keep
                people around, someone else will notice they're good at what
                they do and snipe them. How do we do this? Sweeping assets and
                giving them to the people who keep the community alive - either
                for free, or at a discount through exclusive auctions and
                minigames. The people who pump everyone elses' bags deserve to
                be given some bags of their own.
              </p>

              <h3>4. Phase 2: DAO as a nexus:</h3>
              <br />
              <p>
                There's a second social arbitrage the DAO wants to solve.
                Powerautists often have genius ideas they're unable to execute -
                autism rarely exists alongside business instincts. The DAO will
                act as a hub to connect community powerautists with people who
                can build out their ideas. When these projects approach launch,
                holders get exclusive access to seed rounds.
              </p>

              <br />
              <h3>5. “we like the cults”</h3>
              <br />
              <p>
                Since the dawn of the internet, authentic subcultures have been
                emerging. These communities are the authentic radicals, the free
                thinkers and the self-taught creators. Those that lean into
                absurdity or create something new with integrity, rather than
                repeating and replaying with a reliance on marketing money. YEET
                wants to recognise, support and connect those who build culture,
                allowing them to grow their finances too.
              </p>
            </v-card-text>
            <div v-else>
              <p style="margin-left: 20px; margin-top: 20px">
                Password Protected
              </p>
              <p style="color: red; margin-left: 20px">
                {{ showAboutIncorrect ? "Incorrect..." : "" }}
              </p>
              <div style="display: flex; flex-direction: row; margin: 20px">
                <v-text-field
                  outlined
                  single-line
                  dense
                  :error="showAboutIncorrect ? true : false"
                  v-model="aboutpass"
                  type="password"
                  @keypress.enter="checkAboutpass"
                >
                </v-text-field>
                <v-btn
                  outlined
                  depressed
                  dense
                  style="margin-top: 2px; margin-left: 20px"
                  @click="checkAboutpass"
                >
                  Submit
                </v-btn>
              </div>
            </div>
          </v-card>
        </template>

        <template v-else-if="window.id === 4">
          <v-card width="600" elevation="0" color="transparent">
            <v-card-text class="roadmap-text" v-if="!showRoadpmap">
              <h3>Phase 1: Staking, Auctions and Minigames</h3>
              <br />
              <p>
                Staking: Staking DAO tokens allows you to become a member of the
                DAO and participate in all DAO activities. Your staked balance
                can be thought of as your bank account, and all DAO transactions
                are paid out of it. Be careful, though - if you let your staked
                balance fall below the amount required for DAO membership, you
                will be unable to participate in DAO activities. Staked tokens
                are locked for 7 days, and that counter resets when you add more
                to your balance. No $YEET tokens are burned when you run
                “drinkthekool-aid.exe” (stake) but 6% of $YEET is burned when
                you run “returntoreality.exe” (unstake). Because as we all know,
                it's not easy to leave cults.
              </p>
              <h3>Auctions:</h3>
              <br />
              <p>
                Auctions are going to be a core part of the way we distribute
                resources in a community. We want to give engaged posters a
                chance to acquire assets they like at a discount. When a member
                bids: 5% of each bid amount goes to the bid pool. The winning
                bid receives the NFT and 20% of the bid pool. 80% of the $YEET
                from the bid pool is burned. Minigames: [redacted] is launched,
                an arcade style minigame where the player avoids obstacles and
                collects items. It will contain some on-chain and off-chain
                aspects to track scores on a leaderboard. The winner will be
                rewarded with whatever NFT the DAO is currently featuring (which
                will be known in advance).
              </p>

              <h3>Social-Games/Experiments:</h3>
              <br />
              <p>
                Beyond actual games, we want to bring some fun to the timeline.
                Psyops are what hold the world together, and we want to
                encourage their proliferation throughout our community. How do
                we do this? Financialized social media antics. Sometimes
                cooperative, sometimes PvP, we'll put something together that
                appeals to everyone who likes fun.
              </p>
              <br />
              <h3>Phase 2: Full DAO Launch</h3>

              <p>
                Phase 2 comes when the DAO emerges as an information hub and
                development platform.
              </p>

              <p>
                1. The DAO will act as a cross pollinator, connecting
                powerautists with the capital and business development teams
                they need in order to make their projects a reality. We'll host
                a “house of 'tism” where we let DAO autists pitch their
                ideas/projects to each other and give the community early
                investment opportunities in the projects they like best.
              </p>
              <p>
                2. The DAO will introduce voting on which NFTs to: Burn,
                Purchase, Auction, Giveaway, Fractionalize along with what
                Social and Minigames to introduce to the community.
              </p>

              <h3>Phase 3: [redacted]</h3>
            </v-card-text>
            <div v-else>
              <p style="margin-left: 20px; margin-top: 20px">
                Password Protected
              </p>
              <p style="color: red; margin-left: 20px">
                {{ showRoadIncorrect ? "Incorrect..." : "" }}
              </p>
              <div style="display: flex; flex-direction: row; margin: 20px">
                <v-text-field
                  outlined
                  single-line
                  :error="showRoadIncorrect ? true : false"
                  dense
                  v-model="roadpass"
                  type="password"
                  @keypress.enter="checkRoadpass"
                >
                </v-text-field>
                <v-btn
                  outlined
                  depressed
                  dense
                  style="margin-top: 2px; margin-left: 20px"
                  @click="checkRoadpass"
                >
                  Submit
                </v-btn>
              </div>
            </div>
          </v-card>
        </template>

        <template v-else-if="window.id === 6">
          <iframe
            src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=0&inputCurrency=0x429acA1cCd47296483D1281c85B24e842de0b758"
            height="500"
            width="100%"
            style="
              border: 0;
              margin: 0 auto;
              margin-bottom: 0.5rem;
              display: block;
              border-radius: 10px;
              max-width: 960px;
              min-width: 500px;
            "
          />
        </template>

        <template v-else-if="window.id === 5">
          <v-card width="600" color="transparent" elevation="0">
            <v-card-text class="tokenomics-text" v-if="showTokenomics">
              <h3>Supply:</h3>
              <p>420,069,000</p>
              <br />
              <h3>Tax</h3>
              <p>0.69% / 0.69%</p>
              <br />
              <h3>Token Distribution:</h3>

              <p>6.9% Team</p>
              <p>6.9% CEX</p>
              <p>
                23.1% Foundation (Marketing, Airdrops, Project Maintenance,
                etc.)
              </p>
              <p>28% LP</p>
              <p>35.1% Presale</p>
            </v-card-text>
            <div v-else>
              <p style="margin-left: 20px; margin-top: 20px">
                Password Protected
              </p>
              <p style="color: red; margin-left: 20px">
                {{ showTokenIncorrect ? "Incorrect..." : "" }}
              </p>
              <div style="display: flex; flex-direction: row; margin: 20px">
                <v-text-field
                  outlined
                  single-line
                  dense
                  :error="showTokenIncorrect ? true : false"
                  v-model="tokenpass"
                  type="password"
                  @keypress.enter="checkTokenpass"
                >
                </v-text-field>
                <v-btn
                  outlined
                  depressed
                  dense
                  style="margin-top: 2px; margin-left: 20px"
                  @click="checkTokenpass"
                >
                  Submit
                </v-btn>
              </div>
            </div>
          </v-card>
        </template>
        <template v-else-if="window.id === 7">
          <iframe
            muted
            class="iframe"
            src="https://jcw87.github.io/c2-smb1/"
          ></iframe>
        </template>
        <template v-else-if="window.id === 8">
          <iframe
            border="0"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            width="500px"
            height="750px"
            muted
            scrolling="no"
            allowtransparency="true"
            src="https://freehtml5games.org/games/tetris-cube/index.html"
          ></iframe>
        </template>
        <template v-else-if="window.id === 9">
          <iframe
            src="https://www.patorjk.com/games/snake/"
            width="600"
            height="400"
            style="border: none"
          ></iframe>
        </template>

        <!-- <template v-else-if="window.id === 11">
          <div class="">
            <div class="trash-icon" @click="openZeroaddr">
              <img
                width="40px"
                src="https://images.blur.io/_blur-prod/0x5af0d9827e0c53e4799bb226655a1de152a425a5/2575-278b3b16ac9bb634?w=640"
              />
              <p>Milady2575</p>
            </div>
            <div class="trash-icon" @click="openZeroaddr">
              <img
                width="40px"
                src="https://images.blur.io/_blur-prod/0x32bb5a147b5371fd901aa4a72b7f82c58a87e36d/1100-6fe78a0604d7ce50?w=640"
              />
              <p>BitBear1100</p>
            </div>
            <div class="trash-icon" @click="openZeroaddr">
              <img
                width="40px"
                src="https://images.blur.io/_blur-prod/0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab/6791-32372e4ab3211cbd?w=640"
              />
              <p>Remilio6791</p>
            </div>
          </div>
        </template> -->
        <!-- 2 Files were deleted. -->
        <template v-else-if="window.id === 11">
          <v-card color="transparent" elevation="0">
            <v-card-text>
              <pre>  Text files updated. </pre>
            </v-card-text>
          </v-card>
        </template>

        <template v-else-if="window.id === 12">
          <!-- <iframe src="https://blur.io/asset/0x32bb5a147b5371fd901aa4a72b7f82c58a87e36d/1100"  width="1000" height="600"></iframe> -->
        </template>
        <template v-else-if="window.id === 13">
          <!-- <iframe></iframe> -->
        </template>
        <template v-else-if="window.id === 14">
          <!-- <iframe></iframe> -->
          <!-- {{ jrpgnum }} -->
          <!-- <v-text-field single-line v-model="jrpgnum" type="number" outlined dense></v-text-field> -->
          <div class="sacrifice" v-if="jrpgready">
            <div>
              <audio
                v-if="jrpgnum < 4"
                src="../assets/Dxrk タークx Ghostface Playa - BUSTAS (Official Audio).mp3"
                autoplay
              ></audio>
              <audio
                v-if="jrpgnum >= 5"
                src="../assets/sigma.mp3"
                autoplay
              ></audio>
              <v-img
                v-if="jrpgnum < 2"
                src="../assets/jrpg/1.png"
                class="v-img"
              ></v-img>
              <v-img
                v-if="jrpgnum > 1 && jrpgnum < 4"
                src="../assets/jrpg/2.png"
                class="v-img"
              ></v-img>
              <v-img
                v-if="jrpgnum == 5"
                src="../assets/jrpg/3.png"
                class="v-img"
              ></v-img>
              <v-img
                v-if="jrpgnum == 6"
                src="../assets/jrpg/yeet_1.webp"
                class="v-img"
              ></v-img>
              <v-img
                v-if="jrpgnum == 7"
                src="../assets/jrpg/yeet_2.webp"
                class="v-img"
              ></v-img>
              <v-img
                v-if="jrpgnum > 7 && jrpgnum < 10"
                src="../assets/jrpg/4.png"
                class="v-img"
              ></v-img>
              <v-img
                v-if="jrpgnum === 10"
                src="../assets/jrpg/package.webp"
                class="v-img"
              ></v-img>
              <div class="jrpg-box-3" v-if="jrpgnum == 11">
                <div class="jrpg-text">
                  <p>{{ jrpg[jrpgnum] }}</p>
                </div>
              </div>
              <v-img
                v-if="jrpgnum === 11"
                src="../assets/jrpg/letsyeet.webp"
                class="v-img"
              ></v-img>
              <v-img
                v-if="jrpgnum === 12"
                src="../assets/jrpg/fin.webp"
                class="v-img"
              ></v-img>
              <div class="jrpg-box-1" v-if="jrpgnum < 2">
                <div class="jrpg-text">
                  <p>{{ jrpg[jrpgnum] }}</p>
                </div>
              </div>

              <div class="jrpg-box-2" v-if="jrpgnum > 1 && jrpgnum < 4">
                <div class="jrpg-text">
                  <p>{{ jrpg[jrpgnum] }}</p>
                </div>
              </div>

              <div class="jrpg-box-3" v-if="jrpgnum > 3 && jrpgnum < 6">
                <div class="jrpg-text">
                  <p>{{ jrpg[jrpgnum] }}</p>
                </div>
              </div>
              <div class="jrpg-box-3" v-if="jrpgnum > 7 && jrpgnum < 10">
                <div class="jrpg-text">
                  <p>{{ jrpg[jrpgnum] }}</p>
                </div>
              </div>

              <button
                v-if="jrpgnum < 12"
                class="jrpg-button"
                @click="continueBtn"
              >
                Continue
              </button>
            </div>
          </div>
          <div v-else>
            <v-card elevation="0" color="white">
              <v-card-text style="text-align: center">
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif"
                  style="width: 200px; margin: 50px"
                />
                <pre style="color: black">Loading necessary files. . .</pre>
              </v-card-text></v-card
            >

            <!-- <div id="progress-bar-container">
                <div id="progress-bar"></div>
              </div> -->
          </div>
        </template>

        <template v-else-if="window.id === 15">
          <v-card
            v-if="showError || showTxPending"
            width="500"
            height="250"
            class="showError"
          >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="(showError = false), (approvalError = false)">
                X
              </v-btn>
            </v-card-actions>
            <v-card-text v-if="showError">
              <p>{{ errorMessage }}</p>
            </v-card-text>

            <v-card-text v-if="showTxPending">
              <p>Transaction pending. . .</p>
            </v-card-text>

            <v-btn
              v-if="approvalError"
              @click="
                approveTokens(availableBalance);
                approvalError = false;
              "
              outlined
              depressed
            >
              Yes
            </v-btn>
          </v-card>

          <v-card elevation="0" color="black" width="700" height="600">
            <div style="text-align: center; padding-top: 40px">
              <img src="../assets/logo-2.png" width="250px" />
            </div>
            <div
              style="text-align: center; padding-top: 50px"
              v-if="!walletConnected"
            >
              <v-btn outlined depressed @click="connectWallet"
                >Connect Wallet</v-btn
              >
            </div>

            <div v-else>
              <v-text-field
                outlined
                depressed
                single-line
                v-model="amount"
                type="number"
                label="Amount"
                style="margin-left: 75px; margin-right: 75px; margin-top: 30px"
                v-if="allowance > 0"
              ></v-text-field>
              <div
                style="display: flex; justify-content: center; margin-top: 50px"
                v-if="allowance < 1"
              >
                <v-btn
                  outlined
                  depressed
                  @click="approveTokens(availableBalance)"
                  >Approve Tokens For Staking</v-btn
                >
                <!-- <v-btn @click="getAllowance()">
                    Hello?
                </v-btn> -->
              </div>
              <div v-else>
                <div style="display: flex; justify-content: center">
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      margin: 0 auto;
                      text-align: center;
                    "
                  >
                    <v-btn
                      outlined
                      depressed
                      x-large
                      style="margin-right: 50px"
                      @click="stakeTokens(amount)"
                      >drinkthekoolaid.exe</v-btn
                    >
                    <v-btn
                      outlined
                      depressed
                      x-large
                      @click="unstakeTokens(amount)"
                      >returntoreality.exe</v-btn
                    >
                  </div>
                </div>
                <div style="display: flex; justify-content: center">
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      margin: 0 auto;
                      text-align: center;
                      padding: 20px;
                    "
                  >
                    <p style="margin-right: 90px">( stake | 0% burn )</p>

                    <p style="margin-left: 90px">( unstake | 6% burn )</p>
                  </div>
                </div>
                <div style="text-align: center; margin-bottom: 20px">
                  <pre> Your wallet: {{ connectedAccount }} </pre>
                  <pre> Allowance: {{ allowance }} </pre>
                  <pre> Staked: {{ stakedBalance }} </pre>
                  <pre> Available:  {{ availableBalance }} </pre>

                  <!-- <p>Approved $YEET for staking: {{ fromSmallestUnit(allowance, getTokenDecimals())  }}</p> -->
                </div>
              </div>
            </div>
          </v-card>
        </template>

        <template v-else-if="window.id === 16">
          <!-- <iframe></iframe> -->

          <v-card elevation="0" color="black" width="700" height="750">
            <div style="padding: 20px">
              <pre>Auction live? {{ AuctionLive }} </pre>
              <pre>Highest Bid: {{ highestBid }} </pre>
              <pre>nftAddress:  {{ nftAddress }}</pre>
              <pre>Previous Auction id:  {{ previousAuctionId }}</pre>
              <pre>Auction starting time: {{ auctionStartingTime }}</pre>
              <pre>Auction ending time: {{ auctionEndingTime }}</pre>
              <pre>Entry price: {{ entryPrice }}</pre>
            </div>
            <div style="text-align: center; padding-top: 40px">
              <!-- <img src="../assets/logo-2.png" width="250px"  style="border: 1px solid white"/> -->

              <v-card
                v-if="showAuctionError || showTxPending"
                width="500"
                height="250"
                class="showError"
              >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click="(showAuctionError = false), (approvalError = false)"
                  >
                    X
                  </v-btn>
                </v-card-actions>
                <v-card-text v-if="showAuctionError">
                  <p>{{ auctionerrorMessage }}</p>
                </v-card-text>

                <v-card-text v-if="showTxPending">
                  <p>Transaction pending. . .</p>
                </v-card-text>
              </v-card>
            </div>
            <div
              style="text-align: center; padding-top: 30px"
              v-if="!walletConnected"
            >
              <v-btn outlined depressed @click="connectWallet"
                >Connect Wallet</v-btn
              >
            </div>

            <div v-else>
              <div v-if="!AuctionLive">
                <v-card
                  width="250"
                  height="250"
                  style="border: 1px solid white; margin: 0 auto"
                >
                  <!-- <img
                    src="https://images.blur.io/_blur-prod/0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab/6791-32372e4ab3211cbd?w=640"
                    width="248px"
                  /> -->
                </v-card>

                <div style="text-align: center">
                  <h3 style="margin: 20px">
                    Current Top Bid: {{ highestBid }} $YEET
                  </h3>
                  <p>
                    Note: Your first bid automatically pays for the entry price,
                    and will be reduced by that. Currently:
                    {{ entryPrice }} $YEET
                  </p>
                </div>
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    padding-left: 40px;
                    padding-right: 40px;
                    padding-top: 30px;
                  "
                >
                  <v-text-field
                    outlined
                    depressed
                    single-line
                    label="Amount"
                    v-model="yeetBid"
                    type="number"
                  ></v-text-field>
                  <v-btn
                    outlined
                    depressed
                    x-large
                    style="margin-top: 2px; margin-left: 15px"
                    @click="placeBid(0, yeetBid)"
                  >
                    Bid
                  </v-btn>
                </div>
                <div class="bidButtons">
                  <!-- 100k, 1M, 5M, 10M -->
                  <v-btn
                    class="bidBtn"
                    outlined
                    depressed
                    @click="yeetBidfn(10000)"
                  >
                    + 10k
                  </v-btn>
                  <v-btn
                    class="bidBtn"
                    outlined
                    depressed
                    @click="yeetBidfn(100000)"
                  >
                    + 100k
                  </v-btn>
                  <v-btn
                    class="bidBtn"
                    outlined
                    depressed
                    @click="yeetBidfn(1000000)"
                  >
                    + 1m
                  </v-btn>
                  <v-btn
                    class="bidBtn"
                    outlined
                    depressed
                    @click="yeetBidfn(5000000)"
                  >
                    + 5M
                  </v-btn>
                  <v-btn
                    class="bidBtn"
                    outlined
                    depressed
                    @click="yeetBidfn(10000000)"
                  >
                    + 10m
                  </v-btn>
                </div>
              </div>

              <v-card-text v-else style="text-align: center; margin-top: 100px">
                <p>Currently no active auctions</p>

                <p>Previous Auctions: {{ previousAuctionId }}</p>
              </v-card-text>
            </div>
          </v-card>
        </template>

        <template v-else-if="window.id === 1337">
          <CollectingGame></CollectingGame>
        </template>
      </Window>
      <Taskbar
        ref="taskbar"
        @shutdown="closed = true"
        :windows="windows"
        @focus-window="focusWindow"
      >
        <template #logo>
          <img
            src="../assets/logo-2.png"
            alt="Logo"
            width="30px"
            style="margin: 4px"
          />
        </template>
        <template #clock>
          <Clock />
        </template>
      </Taskbar>
      <!-- <div class="add-window" @click="addNewWindow"><v-btn> + </v-btn></div> -->
    </div>

    <div v-else-if="!isDesktop" class="mobile-message">
      <div class="console">
        <p>
          YEET your portable device and come back on your desktop for a banger
          experience on YEET OS
        </p>
        <br />
        <p>For more info about YEET DAO,</p>
        <p>
          visit:
          <a href="https://yeet-dao.gitbook.io/project-files/" style="">
            https://yeet-dao.gitbook.io/project-files/
          </a>
        </p>
        <div class="button-container">
          <a href="https://twitter.com/yeet_dao">
            <button class="button">
              <img src="../assets/twitter.png" />
            </button>
          </a>
          <a href="https://t.me/yeet_dao">
            <button class="button">
              <img src="../assets/telegram.png" />
            </button>
          </a>
          <a
            href="https://dexscreener.com/ethereum/0x599cda43cc0e26030c714617d6a6b300fee16586"
          >
            <button class="button">
              <img src="../assets/dextools.png" />
            </button>
          </a>
        </div>
      </div>
    </div>

    <div v-else-if="isDesktop && showIntro">
      <div class="bootup-screen" v-if="!playvideo" @click="playvideo = true">
        <h1>Welcome to YEET OS</h1>
        <p>Press any key to continue...</p>
      </div>

      <div v-else>
        <div id="intro-video">
          <IntroVideo @videoEnded="onVideoEnded"> </IntroVideo>
        </div>
      </div>
    </div>

    <div class="shutdown-screen" v-else>
      <img src="@/assets/windows98bluescreen.jpg" />
    </div>
  </div>
</template>

<script>
// import watch from "vue";
import { mapState, mapMutations, mapActions } from "vuex";
import watch from "vue";
import Window from "./Window.vue";
import Taskbar from "./Taskbar.vue";
import Clock from "./Clock.vue";
import IntroVideo from "./IntroVideo.vue";

import staking from "../hardhatabi/sepiola_staking.json";
import yeet from "../hardhatabi/sepiola_mock.json";
import auction from "../hardhatabi/sepiola_auction.json";

import web3 from "web3";

// import CryptoStaking from "./Staking.vue";

import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import CollectingGame from "./CollectingGame.vue";

export default {
  data() {
    return {
      showError: false,
      showAuctionError: false,
      errorMessage: "",
      auctionerrorMessage: "",
      approvalError: false,
      player: null,
      playlistItems: null,
      closed: false,
      isDesktop: true,
      showAbout: true,
      showRoadpmap: false,
      showIntro: true,
      aboutpass: "",
      roadpass: "",
      tokenpass: "",
      playvideo: false,
      showTokenomics: true,
      showTokenIncorrect: false,
      showAboutIncorrect: false,
      showRoadIncorrect: false,
      firstTimeRecycle: true,
      walletConnected: false,
      connectedAccount: "",
      provider: {},
      signer: {},
      yeetBid: 0,
      network: "",
      jrpg: [
        "Todayy im playink wit min onlin frens on da compootr :3",
        "...  I wnder wat remilio-kun r doing rait naow ",
        "Oh.. looks liek shitkoin seasn going stronk..   We kent let dem do dat..",
        "its taim to activaet mass-rug.exe hehehe",
        "...",
        "Not on my watch.",
        "",
        "",
        "Hmm... Now what to do with these two?",
        "Oh,  I know.",
        "",
        "Lets yeet 'em",
      ],
      jrpgnum: 0,
      jrpgready: false,
      isApproved: false,
      stakingContract: null,
      yeetCoinContract: null,
      auctionContract: null,
      allowance: null,
      stakedBalance: null,
      availableBalance: null,
      showTxPending: false,
      amount: 0,
      AuctionLive: false,
      highestBid: 0,
      nftAddress: "",
      previousAuctionId: 0,
      auctionStartingTime: null,
      auctionEndingTime: null,
      entryPrice: null,
    };
  },

  created() {},
  mounted() {
    // Create an array of image sources
    document.addEventListener("keydown", this.handleKeyDown);
    this.checkDevice();

    window.ethereum.on("accountsChanged", (accounts) => {
      console.log("accounts changed");
      this.connectedAccount = accounts[0];
      this.updateBalances();
    });
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeyDown);
  },

  components: {
    Window,
    Taskbar,
    Clock,
    IntroVideo,
    CollectingGame,
  },
  computed: {
    ...mapState(["windows"]),
  },
  methods: {
    async connectWallet() {
      console.log("Connecting to wallet...");
      // this.loading = true;

      /*     this.changeNetwork(); */

      [this.connectedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(this.provider);
      if (this.connectedAccount != "") {
        this.signer = await this.provider.getSigner();

        await this.loadContracts();
        // await this.updateBalances();
        // this.listContractFunctions(this.yeetCoinContract);

        this.showNotConnected = false;
        await this.provider.getNetwork().then((network) => {
          console.log(network);
          this.network = network.name;
        });

        await this.updateBalances();

        // await this.getContactInfo();
      } else {
        this.walletConnected = false;
      }
      this.walletConnected = true;
      // await this.getContactInfo().then(() => {
      //   this.walletConnected = true;
      // });
      // this.loading = false;
    },
    formatErrorMessage(error) {
      if (typeof error === "string") {
        const reasonIndex = error.indexOf('reason="');
        if (reasonIndex !== -1) {
          const reasonStartIndex = reasonIndex + 'reason="'.length;
          const reasonEndIndex = error.indexOf('"', reasonStartIndex);
          if (reasonEndIndex !== -1) {
            return error.substring(reasonStartIndex, reasonEndIndex);
          }
        }
        return error;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        if ("reason" in error) {
          return error.reason;
        }
        return error.message;
      } else {
        return "Unknown error";
      }
    },

    async updateBalances() {
      if (this.connectedAccount) {
        this.allowance = await this.getAllowance();
        this.stakedBalance = await this.getStakedBalance();
        this.availableBalance = await this.getAvailableBalance();
        this.amount = this.availableBalance;
        this.yeetBid = this.stakedBalance;
      }
    },

    async getAllowance() {
      const allowance = await this.yeetCoinContract.allowance(
        this.connectedAccount,
        this.stakingContract.address
      );
      const decimals = await this.getTokenDecimals();
      return this.fromSmallestUnit(allowance, decimals);
      // return allowance;
    },

    async approveTokens(amountToApprove) {
      try {
        // Estimate the gas needed for the transaction
        const gasEstimate = await this.yeetCoinContract.estimateGas.approve(
          this.stakingContract.address,
          amountToApprove
        );

        // Increase the gas estimate by 20%
        const gasLimit = gasEstimate.mul(120).div(100);

        // Execute the transaction with the increased gas limit
        const approvalTx = await this.yeetCoinContract.approve(
          this.stakingContract.address,
          amountToApprove,
          {
            gasLimit: gasLimit,
          }
        );
        this.showTxPending = true;
        await approvalTx.wait();
        this.updateBalances();
        this.updateAuction();
        this.showTxPending = false;
        this.approvalError = false;
      } catch (error) {
        console.log("error:", typeof error);

        console.error("Error during approval:", error);
        this.showError = true;
        this.errorMessage = this.formatErrorMessage(error);
      }
    },

    async getStakedBalance() {
      const stakedBalance = await this.stakingContract.balanceOf(
        this.connectedAccount
      );
      const decimals = await this.getTokenDecimals();

      return this.fromSmallestUnit(stakedBalance, decimals);
    },

    async getAvailableBalance() {
      const availableBalance = await this.yeetCoinContract.balanceOf(
        this.connectedAccount
      );
      const decimals = await this.getTokenDecimals();
      return this.fromSmallestUnit(availableBalance, decimals);
    },

    async stakeTokens(amountToStake) {
      const al = this.getAllowance();

      if (amountToStake > al) {
        this.errorMessage =
          "You cannot stake more than you have approved, approve more?";
        this.approvalError = true;
        this.showError = true;
        return;
      }

      // Get the token's number of decimals
      const tokenDecimals = await this.getTokenDecimals();

      // Convert the amount to the smallest unit of the token
      const smallestUnitAmount = this.toSmallestUnit(
        amountToStake,
        tokenDecimals
      );

      console.log(smallestUnitAmount);
      const data = this.stakingContract.interface.encodeFunctionData(
        "deposit",
        [smallestUnitAmount]
      );
      console.log(data);

      // Create a new instance of the contract function connected to the provider
      // const contractWithProvider = this.stakingContract.connect(this.provider);
      try {
        // Estimate the gas limit
        const estimatedGasLimit = await this.provider.estimateGas({
          from: this.connectedAccount,
          to: this.stakingContract.address,
          value: 0,
          data: this.stakingContract.interface.encodeFunctionData("deposit", [
            smallestUnitAmount,
          ]),
        });

        // Add 20% to the estimated gas limit
        const increasedGasLimit = estimatedGasLimit.mul(120).div(100);

        // Call the function with the signer and the increased gas limit
        const stakeTx = await this.stakingContract.deposit(smallestUnitAmount, {
          gasLimit: increasedGasLimit,
        });

        this.showTxPending = true;
        await stakeTx.wait();
        this.showTxPending = false;

        this.updateBalances();
        this.errorMessage = "";
      } catch (error) {
        console.log("error:", typeof error);
        this.errorMessage = this.formatErrorMessage(error);
        this.showError = true;
      }
    },
    async unstakeTokens(amountToUnstake) {
      if (amountToUnstake > this.stakedBalance) {
        this.errorMessage = "You cannot unstake more yeet than you have staked";
        this.showError = true;
        return;
      }
      // const contractWithProvider = this.stakingContract.connect(this.provider);
      const tokenDecimals = await this.getTokenDecimals();
      const smallestUnitAmount = this.toSmallestUnit(
        amountToUnstake,
        tokenDecimals
      );

      try {
        const estimatedGasLimit = await this.provider.estimateGas({
          from: this.connectedAccount,
          to: this.stakingContract.address,
          value: 0,
          data: this.stakingContract.interface.encodeFunctionData("withdraw", [
            amountToUnstake,
          ]),
        });
        const increasedGasLimit = estimatedGasLimit.mul(120).div(100);
        const unstakeTx = await this.stakingContract.withdraw(
          smallestUnitAmount,
          {
            gasLimit: increasedGasLimit,
          }
        );
        this.showTxPending = true;
        await unstakeTx.wait();
        this.showTxPending = false;
        this.updateBalances();
      } catch (error) {
        console.log("error:", typeof error);
        this.errorMessage = this.formatErrorMessage(error);
        this.showError = true;
      }
    },

    async getTokenDecimals() {
      const decimals = await this.yeetCoinContract.decimals();
      return decimals;
    },

    fromSmallestUnit(balance, decimals) {
      return balance.div(ethers.BigNumber.from(10).pow(decimals));
    },

    // toSmallestUnit(amountToConvert, tokenDecimals) {
    //   const base = ethers.BigNumber.from(10).pow(tokenDecimals);
    //   return ethers.utils
    //     .parseUnits(amountToConvert.toString(), tokenDecimals)
    //     .mul(base);
    // },

    toSmallestUnit(amountToConvert, tokenDecimals) {
      return ethers.BigNumber.from(amountToConvert).mul(
        ethers.BigNumber.from(10).pow(tokenDecimals)
      );
    },

    async hasPaidEntrance(auctionId, address) {
      try {
        const paid = await this.auctionContract.hasPaidEntrance(
          auctionId,
          address
        );
        console.log("Has paid entrance:", paid);
        return paid;
      } catch (error) {
        console.error("Error checking entrance payment:", error);
      }
    },

    async isAuctionLive(auctionId) {
      try {
        const live = await this.auctionContract.isAuctionLive(auctionId);
        console.log("Is auction live:", live);
        return live;
      } catch (error) {
        console.error("Error checking auction status:", error);
      }
    },

    async placeBid(auctionId, amount) {
      await this.updateAuction();
      try {
        // Check if the wallet is connected
        if (!this.walletConnected) {
          console.log("Wallet not connected");
          return;
        }
        if (amount < this.highestBid) {
          this.showAuctionError = true;
          this.auctionerrorMessage =
            "Your bid is lower than the current top bid";
          return;
        }
        if (amount - this.entryPrice < 0) {
          this.showAuctionError = true;
          this.auctionerrorMessage = "Your bid does not cover the entry price";
          return;
        }

        const tokenDecimals = await this.getTokenDecimals();
        const newAmount = this.toSmallestUnit(amount, tokenDecimals);

        // console.log(newAmount)

        // const data = this.auctionContract.interface.encodeFunctionData("bid", [
        //   auctionId,
        //   amount,
        // ]);

        // console.log(data);

        // Call the contract's `bid` function to place a bid and pay the entrance fee if not paid yet
        const estimatedGasLimit = await this.provider.estimateGas({
          from: this.connectedAccount,
          to: this.auctionContract.address,
          value: 0,
          data: this.auctionContract.interface.encodeFunctionData("bid", [
            auctionId,
            newAmount,
          ]),
        });
        const increasedGasLimit = estimatedGasLimit.mul(120).div(100);

        const receipt = await this.auctionContract.bid(auctionId, newAmount, {
          gasLimit: increasedGasLimit,
        });
        // Wait for the transaction to be mined
        console.log("Transaction receipt:", receipt);
      } catch (error) {
        console.error("Error placing bid:", error);
        this.showAuctionError = true;
        this.auctionerrorMessage = this.formatErrorMessage(error);
      }
    },

    // async bid(auctionId, amount) {
    //   try {
    //     const tx = await this.auctionContract.bid(auctionId, amount);
    //     await tx.wait();
    //     console.log("Bid placed successfully");
    //     this.updateAuction();
    //   } catch (error) {
    //     console.error("Error placing bid:", error);
    //   }
    // },

    async getHighestBid(auctionId) {
      try {
        const bid = await this.auctionContract.bids(auctionId);
        const bidAmount = bid.amount;
        const decimals = 18; // Assuming the token has 18 decimals
        const readableBidAmount = this.fromSmallestUnit(bidAmount, decimals);
        return readableBidAmount.toString();
      } catch (error) {
        console.error("Error getting highest bid:", error);
      }
    },

    async getAuctionDetails(auctionId) {
      try {
        const auction = await this.auctionContract.auctions(auctionId);
        return {
          nftAddress: auction.nftAddress,
          tokenId: auction.tokenId.toString(),
          startingTime: auction.startingTime.toString(),
          endingTime: auction.endingTime.toString(),
          entryPrice: auction.entryPrice.toString(),
        };
      } catch (error) {
        console.error("Error getting auction details:", error);
      }
    },

    async updateAuction() {
      this.AuctionLive = await this.isAuctionLive();
      if (this.AuctionLive) {
        const latestId = await this.latestAuctionId();
        const highestBid = await this.getHighestBid(latestId);
        const auctionDetails = await this.getAuctionDetails(latestId);
        this.highestBid = highestBid;
        this.nftAddress = auctionDetails.nftAddress;
        this.startingTime = auctionDetails.startingTime;
        this.endingTime = auctionDetails.endingTime;
        this.entryPrice = auctionDetails.entryPrice;
      } else {
        this.previousAuctionId = await this.latestAuctionId();
      }
    },

    yeetBidfn(bid) {
      let currentBid = parseFloat(this.yeetBid);
      bid = parseFloat(bid);

      currentBid = currentBid + bid;

      this.yeetBid = currentBid.toFixed(4); // or however many decimal places you want
    },

    onVideoEnded() {
      this.showIntro = false;
      this.playvideo = false;
    },
    playIntroVideo() {
      this.playvideo = true;
    },
    hideBootupScreen() {
      this.playIntroVideo();
    },
    checkDevice() {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const isPortable =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isPortable || width < 1000) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
    },

    checkAboutpass() {
      const hashedInput = CryptoJS.SHA256(this.aboutpass).toString(
        CryptoJS.enc.Hex
      );
      console.log(hashedInput);
      const hashedPassword =
        "ed4eb561259d67d2acae80454db6878f1a4d72b6e4cb8da9c02883f34e4f50bc"; // The hashed value of "godtierdev0000"

      if (hashedInput === hashedPassword) {
        this.showAbout = true;
      } else {
        this.showAboutIncorrect = true;
      }
    },

    checkTokenpass() {
      const hashedInput = CryptoJS.SHA256(this.tokenpass).toString(
        CryptoJS.enc.Hex
      );
      const hashedPassword =
        "f248c55b34d30b74cd78088ce1c978f01c9d3698dc388ca0e7d36796427f3597"; // The hashed value of "miladypassword1337"

      if (hashedInput === hashedPassword) {
        this.showTokenomics = true;
      } else {
        this.showTokenIncorrect = true;
      }
    },

    async loadContracts() {
      this.stakingContract = new ethers.Contract(
        staking.address,
        staking.abi,
        this.signer
      );
      this.yeetCoinContract = new ethers.Contract(
        yeet.address,
        yeet.abi,
        this.signer
      );

      this.auctionContract = new ethers.Contract(
        auction.address,
        auction.abi,
        this.signer
      );
    },

    listContractFunctions(contractInstance) {
      const contractFunctions = contractInstance.interface.fragments.filter(
        (fragment) => fragment.type === "function"
      );

      console.log("Contract functions:");
      contractFunctions.forEach((func) => {
        console.log(func.name);
      });
    },

    checkRoadpass() {
      const hashedInput = CryptoJS.SHA256(this.roadpass).toString(
        CryptoJS.enc.Hex
      );
      const hashedPassword =
        "441b7681786fefcf0b41c3952a0ffecb1221315407a031f61d145ae99dbe9bf7"; // The hashed value of "69420"

      if (hashedInput === hashedPassword) {
        this.showRoadmap = true;
      } else {
        this.showRoadIncorrect = true;
      }
    },
    handleKeyDown(event) {
      this.hideBootupScreen();
      if (event.keyCode === 27) {
        this.closed = false;
      }
    },
    playSong(target) {
      for (const item of this.playlistItems) {
        item.classList.remove("active");
      }
      target.classList.add("active");
      this.player.src = target.getAttribute("data-src");
      this.player.play();
    },
    ...mapMutations([
      "createWindow",
      "updateWindow",
      "removeWindow",
      "focusWindow",
    ]),
    ...mapActions(["minimizeWindow"]),

    loadImages() {
      const imageSources = [
        require("@/assets/jrpg/1.png"),
        require("@/assets/jrpg/2.png"),
        require("@/assets/jrpg/3.png"),
        require("@/assets/jrpg/4.png"),
        require("@/assets/jrpg/yeet_1.webp"),
        require("@/assets/jrpg/yeet_2.webp"),
        require("@/assets/jrpg/fin.webp"),
        require("@/assets/jrpg/letsyeet.webp"),
        require("@/assets/jrpg/package.webp"),
      ];

      let images = [];
      let imagesLoaded = 0;

      // Get the progress bar element
      // const progressBar = document.getElementById("progress-bar");

      // Preload images into the browser's cache
      for (let i = 0; i < imageSources.length; i++) {
        images[i] = new Image();
        images[i].onload = () => {
          imagesLoaded++;
          // progressBar.style.width = `${
          //   (imagesLoaded / imageSources.length) * 100
          // }%`;
          console.log(this.jrpgready);
          if (imagesLoaded === imageSources.length) {
            // All images have been loaded
            this.jrpgready = true;
            console.log(this.jrpgready);
            console.log("All images have been loaded!");
          }
        };
        images[i].src = imageSources[i];
      }
    },

    openBin() {
      this.jrpgnum = 0;
      this.loadImages();
      this.$store.dispatch("openWindow", {
        id: 14,
      });
    },
    continueBtn() {
      this.jrpgnum += 1;
      var button = document.querySelector(".jrpg-button");

      // Disable the button for 1 second
      button.disabled = true;
      setTimeout(function () {
        button.disabled = false;
      }, 1000);
    },

    openZeroaddr() {
      // this.$store.dispatch("openWindow", {
      //   id: 11,
      // });
      window.open(
        "https://etherscan.io/address/0x000000000000000000000000000000000000dead",
        "_blank"
      );
    },

    openOsOne() {
      // this.$store.dispatch("openWindow", {
      //   id: 11,
      // });
      window.open(
        "https://blur.io/asset/0x5af0d9827e0c53e4799bb226655a1de152a425a5/2575",
        "_blank"
      );
    },
    openOsTwo() {
      // this.$store.dispatch("openWindow", {
      //   id: 12,
      // });
      window.open(
        "https://blur.io/asset/0x32bb5a147b5371fd901aa4a72b7f82c58a87e36d/1100",
        "_blank"
      );
    },
    openOsThree() {
      // this.$store.dispatch("openWindow", {
      //   id: 13,
      // });
      window.open(
        "https://blur.io/asset/0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab/6791",
        "_blank"
      );
    },
    openOsFour() {
      window.open(
        "https://blur.io/asset/0xf729f878f95548bc7f14b127c96089cf121505f8/115",
        "_blank"
      );
    },

    openWinamp() {
      this.$refs.taskbar.initializeWebamp();
    },
    openSuperMario() {
      this.$store.dispatch("openWindow", {
        id: 7,
      });
    },
    openTetris() {
      this.$store.dispatch("openWindow", {
        id: 8,
      });
    },

    openSocialsWindow() {
      this.$store.dispatch("openWindow", {
        id: 1,
      });
    },
    openYeetWindow() {
      this.$store.dispatch("openWindow", {
        id: 2,
      });
    },
    openPurposeWindow() {
      this.$store.dispatch("openWindow", {
        id: 3,
      });
    },
    openRoadmapWindow() {
      this.$store.dispatch("openWindow", {
        id: 4,
      });
    },
    openTokenomicsWindow() {
      this.$store.dispatch("openWindow", {
        id: 5,
      });
    },

    openUniswapWindow() {
      this.$store.dispatch("openWindow", {
        id: 6,
      });
    },

    openSnake() {
      this.$store.dispatch("openWindow", {
        id: 9,
      });
    },

    openStaking() {
      this.$store.dispatch("openWindow", {
        id: 15,
      });
    },
    openAuction() {
      this.$store.dispatch("openWindow", {
        id: 16,
      });
    },

    closeWindow(windowId) {
      this.removeWindow(windowId);
    },
    addNewWindow() {
      this.createWindow({ title: "New Window" });
    },
    minimizeWindow(windowId) {
      this.minimizeWindow({ id: windowId });
    },
  },
};
</script>

<style scoped>
.bootup-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  font-family: "Source Code Pro", monospace;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bootup-screen h1 {
  font-size: 48px;
  margin-bottom: 0;
}

.bootup-screen p {
  font-size: 24px;
  margin-top: 0;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 2em;
  position: relative; /* add this */
  z-index: 1; /* add this */
}

.button {
  background-color: transparent;
  border: none;
  margin: 0 0.5em;
  cursor: pointer;
  padding: 0;
}

.button img {
  width: 35px;
  height: 35px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#app {
  animation: fadeIn 1.5s ease-in-out;
  background-image: url("@/assets/bg.png") !important;
  background-size: cover !important;
}

/* Disable animation for Firefox */
/* @-moz-document url-prefix() {
  #app {
    animation: none;
  }
} */

#intro-video {
  position: absolute;
  background-color: #000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.mobile-message {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}

.console {
  background-color: black;
  color: white;
  /* border: 1px solid #ff0000; */
  padding: 20px;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  border-radius: 5px;
  margin: 5px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
}

.desktop-icons {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.desktop-icons-2 {
  position: absolute;
  top: 15%;
  right: 1.1%;
  display: flex;
  justify-content: left;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.desktop-icons-3 {
  position: absolute;
  top: 30%;
  left: 2%;
  display: flex;
  justify-content: left;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin: 12px;
  height: 120px;
  background-size: contain;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  max-width: calc(25% - 20px); /* 20px = combined margin of two items */
}

.trash-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;

  border: 1px solid #292c37;
}

.trash-icon p {
  margin-top: 20px;
  margin-left: 20px;
}
.trash-icon:hover {
  background-color: #292c37;
}
.iframe {
  width: 600px;
  height: 600px;
}

.desktop-icon img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}
.social-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.about-text {
  max-height: 300px; /* set a maximum height for the card */
  overflow-y: scroll; /* enable vertical scrolling */
  padding: 10px; /* add some padding to the text */
  font-size: 14px; /* adjust the font size */
  line-height: 1.5; /* adjust the line height */
  text-align: justify; /* justify the text */
}

.about-text {
  overflow: auto;
  max-height: 500px;
  padding: 30px !important;
}

.about-text h4 {
  margin-top: 20px;
}

.about-text {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.roadmap-text {
  max-height: 500px;
  overflow-y: auto;
  padding: 30px !important;
}

/* .social-buttons v-btn {
  margin: 0 8px;
} */

.desktop-icon p {
  margin: 0;
}

.sacrifice {
  animation: fadeIn 1.5s ease-in-out;
  width: 900px; /* set width to 80% of viewport width */
  height: 500px; /* set height to 60% of viewport height */
  background: #000;
}

.shutdown-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 1000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shutdown-screen img {
  width: 100%;
  height: auto;
  z-index: 9999999;
}

.v-img {
  animation: fadeIn 1.5s ease-in-out;
  max-width: 100%;
  max-height: 100%;
}

.jrpg-box {
  background-color: #2b3d4f;
  border: 5px solid #d7ccc8;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  height: 150px;
  padding: 10px;
  position: absolute;
  width: 300px;

  bottom: 30px !important;
}

.jrpg-box-1 {
  background-color: #2c5176;
  border: 5px solid #f3efee;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  height: 100px;
  padding: 10px;
  position: absolute;
  top: 70%;
  left: 30%;
  width: 350px;
  opacity: 80%;
}

.jrpg-box-1::before {
  border-right: 25px solid #f3efee;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  content: "";
  height: 0;
  position: absolute;
  left: -25px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
}

.jrpg-box-2 {
  animation: fadeIn 1.5s ease-in-out;
  background-color: #2c5176;
  border: 5px solid #f3efee;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  height: 100px;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 30%;
  width: 350px;
  opacity: 80%;
}

.jrpg-box-2 .img {
  animation: fadeIn 1.5s ease-in-out;
}

.jrpg-box-2::before {
  border-left: 25px solid #f3efee;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  content: "";
  height: 0;
  position: absolute;
  right: -25px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
}

.jrpg-box-3 {
  /* animation: fadeIn 1.5s ease-in-out; */
  background-color: #2c5176;
  border: 5px solid #f3efee;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  height: 60px;
  padding: 10px;
  position: absolute;
  top: 80%;
  left: 30%;
  width: 350px;
  opacity: 80%;
  z-index: 9999;
}

.jrpg-box::before {
  border-bottom: 25px solid #d7ccc8;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  content: "";
  height: 0;
  position: absolute;
  top: -25px;
  width: 0;
}

.jrpg-text {
  color: #ffffff;
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  width: 100%;
  height: 100%;
}

.jrpg-button {
  animation: fadeIn 0.5s ease-in-out;
  background-color: #d7ccc8;

  border-radius: 5px;
  color: #2b3d4f;
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  padding: 10px;
  position: absolute;
  border: 1px solid wheat;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}

.jrpg-button:hover {
  background-color: #a29a97;
}

.jrpg-button:disabled {
  display: none;
}
.bidBtn {
  margin-left: 10px;
  margin-right: 10px;
}

.bidButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#progress-bar-container {
  width: 100%;
  height: 20px;
  background-color: gray;
}

#progress-bar {
  width: 0%;
  height: 100%;
  background-color: blue;
}

.showError {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin: 0 auto;
  overflow: auto;
  border: 5px solid white;
}
</style>
