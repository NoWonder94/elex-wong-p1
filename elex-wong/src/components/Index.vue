<template>
  <div class="main">
      <div id="particles-js" class="particles" >
          <lottie class="lottie" :options="defaultOptions" />
          <div style="width:100%;position:absolute;bottom:8%;z-index:1;">
                <img src="../assets/icon/mouse-01.svg" @click="handleHref" style="display:block;margin:0 auto;z-index:2;" class="mouseAnimation"/>
                <img src="../assets/icon/down_arrow-01.svg" @click="handleHref" style="display:block;margin:0 auto;margin-top:28px;" class="arrowAnimation"/>
          </div>
      </div>
      <div class="aboutUs">
        <div class="gradientOverlay">
          <div class="aboutUsDesc">
            <h1>About Us
                <img class="ball" src="../assets/icon/element1.svg"/>
            </h1>
            <p>POSEIDON IT SOLUTION - We are a network development company producing web applications. Anyone want to get to your pleasant working environment and challenging. In a work environment that is friendly along with open with the moments, we ensure that every individual gets an equal opportunity to continue to develop their selves and their careers together with us.</p>
          </div>
        </div>
        <div class="pattern">
                <img id="img1" src="../assets/icon/element2.svg" class="pattern_1" style="display:none;"/>
                <img id="img2" src="../assets/icon/element3.svg" class="pattern_2" style="display:none;"/>
          </div>
      </div>
      <div class="our-team-and-join-us">
            <div class="our-team-part">
                <div class="our-team-content">
                    <img class="button-close-1" src="../assets/icon/close_button.svg">
                    <div class="our-team-content-description">
                        We are committed to motivate, empower & develop our people to shape talented individuals for the future growth of the company.
                    </div>
                    <hr style="margin-bottom:0rem;">
                    <div class="our-team-content-list scroll">
                        <div style="height:1rem;">&nbsp;</div>
                        <div v-for="item in member" :key="item.name">
                            <div class="our-team-content-list-member">
                                <div class="our-team-content-list-member-img">
                                    <img v-bind:src="item.img">
                                </div>
                                <!-- <div class="our-team-content-list-member-description" v-b-popover.hover.right="item.name"> -->
                                  <div class="our-team-content-list-member-description">
                                    <div class="our-team-content-list-member-description-position">
                                        {{ item.position }}
                                    </div>
                                    <div class="our-team-content-list-member-description-name">
                                        {{ item.name }}
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>
                <div class="our-team">
                    <div class="ViewMore">
                        <img class="hand" src="../assets/icon/point_left-01.svg"/>
                        <span style="font-size:3vw;">View more details</span>
                    </div>
                    <div class="gradient">
                        <div class="our-team-main">

                            <div class="our-team-title">
                                Our Team
                            </div>
                            <img class="ball" src="../assets/icon/element_blue.svg"/>
                            <div class="our-team-description">
                                We are committed to motivate, empower & develop our people to shape talented individuals for the future growth of the company.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="join-us-part">
                <div class="join-us-content">
                    <img class="button-close-2" src="../assets/icon/close_button.svg">
                    <div class="join-us-content-description">
                        Send your resume to hr@poseidon-it.com
                    </div>
                    <hr>
                    <div class="join-us-content-list scroll">
                        <div>
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse1 v-on:click="toggleDiv('1')">
                                    Frontend Engineer
                                    <img v-if="collapse1" class="collapse_image" src="../assets/icon/-.svg"/>
                                    <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                                </b-list-group-item>
                                <b-collapse id="collapse1" class="mt-2">
                                    <b-card class="joinUsCollapseCard">
                                        <p>
                                            Job Responsibilities:
                                        </p>
                                        <ul>
                                            <li>
                                                Responsible for the production of the web front-end and the company’s internet products
                                            </li>
                                            <li>
                                                Responsible for production of the web front-end and the realization of the effect
                                            </li>
                                            <li>
                                                Apply visual styles and interactions through various emerging technologies, such as ES6, CSS3, etc.
                                            </li>
                                            <li>
                                                Cooperate with designers and developers to adjust, modify and optimize pages according to requirements.
                                            </li>
                                        </ul>
                                        <p>
                                            Requirements:
                                        </p>
                                        <ul>
                                            <li>
                                                Bachelor's Degree in Computer Science / Computer Engineering
                                            </li>
                                            <li>
                                                Min 2 years of front-end or web application development experience
                                            </li>
                                            <li>
                                                Proficient in HTML5, CSS3 (e.g. Sass) and Javascripts (e.g. ES6)
                                            </li>
                                            <li>
                                                Proficient in front End development using VueJS
                                            </li>
                                            <li>
                                                Experience with front-end Test Driven Development and Continuous Integration
                                            </li>
                                            <li>
                                                Experience of D3.js or related web data visualisation tools
                                            </li>
                                            <li>
                                                Experience with web responsive design and implementation and handling cross browser compatibility
                                            </li>
                                            <li>
                                                <span class="joinUsBold">
                                                    For Junior
                                                </span>
                                                , minimum 1-2 years of working experience in the related field, fresh graduates are encouraged to apply.
                                            </li>
                                            <li>
                                                <span class="joinUsBold">
                                                    Required language
                                                </span>
                                                : Chinese & English (Speak & Write)
                                            </li>
                                        </ul>
                                        <p>
                                            Benefits:
                                        </p>
                                        <ul>
                                            <li>
                                                EPF & SOCSO
                                            </li>
                                            <li>
                                                Medical Claim, dental claim available
                                            </li>
                                            <li>
                                                Year End bonus after working for a full year
                                            </li>
                                            <li>
                                                Increment based on performance
                                            </li>
                                        </ul>
                                    </b-card>
                                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('1')" v-b-modal.modal-center-mobile>
                                        Apply Now
                                    </b-button>
                                </b-collapse>
                                <hr>
                                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse2 v-on:click="toggleDiv('2')">
                                    Senior PHP Developer
                                    <img v-if="collapse2" class="collapse_image" src="../assets/icon/-.svg"/>
                                    <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                                </b-list-group-item>
                                <b-collapse id="collapse2" class="mt-2">
                                    <b-card class="joinUsCollapseCard">
                                        <p>
                                            Job Responsibilities:
                                        </p>
                                        <ul>
                                            <li>
                                                Develop, Customize, Enhance developed web application in PHP.
                                            </li>
                                            <li>
                                                Integration of user-facing elements developed by front-end developers.
                                            </li>
                                            <li>
                                                Build efficient, testable, and reusable PHP modules.
                                            </li>
                                            <li>
                                                Solve complex performance problems and architectural challenges
                                            </li>
                                            <li>
                                                Create and implement a robust set of services and APls to power web applications.
                                            </li>
                                        </ul>
                                        <p>
                                            Requirements:
                                        </p>
                                        <ul>
                                            <li>
                                                At least a Bachelor’s Degree in Information Technology or Computer Science or relevant field.
                                            </li>
                                            <li>
                                                Required skills: HTML5, PHP (laravel framework), JQuery, MS SQL, MYSQL, JavaScript, JSON, AJAX etc.
                                            </li>
                                            <li>
                                                Strong analytical skill and good problem solving skill.
                                            </li>
                                            <li>
                                                Able to work as team player to achieve assigned task within the deadline.
                                            </li>
                                            <li>
                                                Matured personality and able to work independently as well as in a team with a can-do working attitude.
                                            </li>
                                            <li>
                                                Preferably 2 years of working experience in the related field
                                            </li>
                                            <li>
                                                Experience in e-commerce, web applications, system development, e-Security industries gives as advantage.
                                            </li>
                                            <li>
                                                Fresh graduates are encouraged to apply.
                                            </li>
                                        </ul>
                                        <p>
                                            Benefits:
                                        </p>
                                        <ul>
                                            <li>
                                                EPF & SOCSO
                                            </li>
                                            <li>
                                                Medical Claim, dental claim available
                                            </li>
                                            <li>
                                                Year End bonus after working for a full year
                                            </li>
                                            <li>
                                                Increment based on performance
                                            </li>
                                        </ul>
                                    </b-card>
                                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('2')" v-b-modal.modal-center-mobile>
                                        Apply Now
                                    </b-button>
                                </b-collapse>
                                <hr>
                                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse3 v-on:click="toggleDiv('3')">
                                    Web Master
                                    <img v-if="collapse3" class="collapse_image" src="../assets/icon/-.svg"/>
                                    <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                                </b-list-group-item>
                                <b-collapse id="collapse3" class="mt-2">
                                    <b-card class="joinUsCollapseCard">
                                        <p>
                                            Job Responsibilities:
                                        </p>
                                        <ul>
                                            <li>
                                                Create and upload copy and image for the blogs and forums
                                            </li>
                                            <li>
                                                Conduct keyword research and web statistics reporting
                                            </li>
                                            <li>
                                                Contribute to company and industry blogs and manage e-communications
                                            </li>
                                            <li>
                                                Keep up to date with current digital trends
                                            </li>
                                            <li>
                                                Research new online media opportunities that may benefit the business including mobile, social media, development of blogs and forums
                                            </li>
                                        </ul>
                                        <p>
                                            Requirements:
                                        </p>
                                        <ul>
                                            <li>
                                                Candidate must possess at least Diploma/Advanced/Higher/Graduate Diploma, Bachelor's Degree/Post Graduate Diploma/Professional Degree in Engineering (Computer/Telecommunication), Computer Science/Information Technology or equivalent.
                                            </li>
                                            <li>
                                                At least 1 year working experience in the related field is required for this position. Fresh graduates are also welcome.
                                            </li>
                                            <li>
                                                Preferably Junior Executive specialized in IT/Computer - Network/System/Database Admin or equivalent.
                                            </li>
                                            <li>
                                                The ability to work independently and flexibly.
                                            </li>
                                            <li>
                                                The capacity to prioritise and work across multiple projects.
                                            </li>
                                            <li>
                                                The ability to work as part of a team.
                                            </li>
                                            <li>
                                                Creative skills for contributing new and innovative ideas.
                                            </li>
                                            <li>
                                                Networking and analytical skills.
                                            </li>
                                            <li>
                                                Knowledge of existing and emerging social media platforms.
                                            </li>
                                            <li>
                                                Excellent IT skills.
                                            </li>
                                            <li>
                                                Familiar Window and Linux system.
                                            </li>
                                        </ul>
                                        <p>
                                            Benefits:
                                        </p>
                                        <ul>
                                            <li>
                                                EPF & SOCSO
                                            </li>
                                            <li>
                                                Medical Claim, Dental Claim and Optical Claim available
                                            </li>
                                            <li>
                                                Year-end bonus after working for a full year
                                            </li>
                                            <li>
                                                Increment based on performance
                                            </li>
                                        </ul>
                                    </b-card>
                                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('3')" v-b-modal.modal-center-mobile>
                                        Apply Now
                                    </b-button>
                                </b-collapse>
                                <hr>
                                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse4 v-on:click="toggleDiv('4')">
                                    Technical Support
                                    <img v-if="collapse4" class="collapse_image" src="../assets/icon/-.svg"/>
                                    <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                                </b-list-group-item>
                                <b-collapse id="collapse4" class="mt-2">
                                    <b-card class="joinUsCollapseCard">
                                        <p>
                                            Job Responsibilities:
                                        </p>
                                        <ul>
                                            <li>
                                                You will provide advice and assistance to users on the usage of simple functional features of application
                                            </li>
                                            <li>
                                                You will be responsible for performing first level troubleshooting support for problems related to application systems
                                            </li>
                                            <li>
                                                This role is primarily phone and internet-based and you must be comfortable with cold-calling, social selling and work with customers to understand and meet their needs to achieving and ambitious individuals who wish to launch successful careers in enterprise technology sales.
                                            </li>
                                            <li>
                                                Research prospective customers to problem solve challenges and recommend products of company
                                            </li>
                                            <li>
                                                Promote company online games across Asia Region
                                            </li>
                                            <li>
                                                Supporting clients after sale, identify and handle customer inquiries completely and accurately to the satisfaction of the customer.
                                            </li>
                                        </ul>
                                        <p>
                                            Requirements:
                                        </p>
                                        <ul>
                                            <li>
                                                Diploma or IT Certificate in Computer Science, any IT Discipline or equivalent, and Marketing.
                                            </li>
                                            <li>
                                                Details knowledge and experience in coordinating with different clients to provide technical support, investigate and fix issues on client’s system during integration phase.
                                            </li>
                                            <li>
                                                Must be able to speak English & Mandarin to ensure smooth communication with end-user support.
                                            </li>
                                            <li>
                                                Candidates have at least 1 to 2 years working experience in relevant field will be an added advantage
                                            </li>
                                            <li>
                                                Able to work on Weekend and Public Holiday
                                            </li>
                                            <li>
                                                Rotating Shift
                                            </li>
                                            <li>
                                                Able to speak and write Chinese and English
                                            </li>
                                            <li>
                                                Fresh graduates are encouraged to apply.
                                            </li>
                                        </ul>
                                        <p>
                                            Benefits:
                                        </p>
                                        <ul>
                                            <li>
                                                EPF & SOCSO
                                            </li>
                                            <li>
                                                Medical Claim, Dental Claim and Optical Claim available
                                            </li>
                                            <li>
                                                Year-end bonus after working for a full year
                                            </li>
                                            <li>
                                                Increment based on performance
                                            </li>
                                        </ul>
                                    </b-card>
                                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('4')" v-b-modal.modal-center-mobile>
                                        Apply Now
                                    </b-button>
                                </b-collapse>
                                <hr>
                                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse5 v-on:click="toggleDiv('5')">
                                    Article Editor
                                    <img v-if="collapse5" class="collapse_image" src="../assets/icon/-.svg"/>
                                    <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                                </b-list-group-item>
                                <b-collapse id="collapse5" class="mt-2">
                                    <b-card class="joinUsCollapseCard">
                                        <p>
                                            Job Responsibilities:
                                        </p>
                                        <ul>
                                            <li>
                                                Writing/ posting research articles on the website &corporate social media
                                            </li>
                                            <li>
                                                Creating content for our social media platforms
                                            </li>
                                            <li>
                                                Familiar with SEO best practices and generate traffic to website and social media
                                            </li>
                                            <li>
                                                Excellent verbal and written communication skill
                                            </li>
                                            <li>
                                                Preferable person who is sensitive to social media trends. Help to enhance and Improve organic traffic performance via difference channels
                                            </li>
                                            <li>
                                                Actively manage and promote our blog, and pitch articles to relevant third party platforms
                                            </li>
                                            <li>
                                                Regularly produce various content types including email, social media posts, blogs and white papers
                                            </li>
                                            <li>
                                                Analyze content marketing metrics and makes changes as needed
                                            </li>
                                            <li>
                                                Collaborate with internal team and agency to manage/ plan social media marketing platform
                                            </li>
                                        </ul>
                                        <p>
                                            Requirements:
                                        </p>
                                        <ul>
                                            <li>
                                                Candidate must possess at least Diploma/Advanced/Higher/Graduate Diploma in Engineering (Computer/Telecommunication), Computer Science/Information Technology, Marketing, Journalism, Linguistics/Languages or equivalent
                                            </li>
                                            <li>
                                                Required language(s): Chinese, English
                                            </li>
                                            <li>
                                                Effective verbal and written communication in both English and Chinese
                                            </li>
                                            <li>
                                                Good understanding of Google SEO
                                            </li>
                                            <li>
                                                At least 1 year working experience in the related field is required for this position. Fresh graduates are also welcome
                                            </li>
                                            <li>
                                                Able to work efficiently with ability to multitask and deliver quality content with little supervision
                                            </li>
                                            <li>
                                                Past experience with online community management, copywriting, and/or blogging will be advantageous
                                            </li>
                                            <li>
                                                Required skill(s): Creative writing, Microsoft Office, Digital Marketing, Social Media Management
                                            </li>
                                        </ul>
                                        <p>
                                            Benefits:
                                        </p>
                                        <ul>
                                            <li>
                                                EPF & SOCSO
                                            </li>
                                            <li>
                                                Medical Claim, Dental Claim and Optical Claim available
                                            </li>
                                            <li>
                                                Year-end bonus after working for a full year
                                            </li>
                                            <li>
                                                Increment based on performance
                                            </li>
                                        </ul>
                                    </b-card>
                                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('5')" v-b-modal.modal-center-mobile>
                                        Apply Now
                                    </b-button>
                                </b-collapse>
                                <hr>
                                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse6 v-on:click="toggleDiv('6')">
                                    Product Manager
                                    <img v-if="collapse6" class="collapse_image" src="../assets/icon/-.svg"/>
                                    <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                                </b-list-group-item>
                                <b-collapse id="collapse6" class="mt-2">
                                    <b-card class="joinUsCollapseCard">
                                        <p>
                                            The Responsibilities:
                                        </p>
                                        <p class="sentence">
                                            Product Managers at Poseidon IT Solution focus on identifying our customers and business problems and are at the intersection of business, design, and engineering. You need to be technical enough to understand how our underlying products are built and have a keen eye for design. You are master communicators that work to bring teams together to drive towards a singular goal of making a product successful. Finally, you are disciplined and understand that product management is both an art and a science.
                                        </p>
                                        <p class="sentence">
                                            In this role, you will be open to a healthy dose of creativity to define a vision for the product and be responsible for the strategy, roadmap, and feature definition of a product. You will be the leader at the forefront as this role would require strong collaboration across a various team and be the focal point for all stakeholders nearly in all functions.
                                        </p>
                                        <p class="sentence">
                                            If you join us, you will learn a lot: In terms of technical ability there are many cool tools, technologies, patterns and other great developers that will sharpen your skills. Personally you be given the chance to step up, lead and make your mark in a growing startup as we tackle the challenges in our next phase of growth.
                                        </p>
                                        <p>
                                            We want team members with attributes like:
                                        </p>
                                        <ul>
                                            <li>
                                                Focus on delivering value to the customer
                                            </li>
                                            <li>
                                                Strong belief in collaboration
                                            </li>
                                            <li>
                                                Passion that drives you to execute and innovate
                                            </li>
                                            <li>
                                                Ability to self-manage and take ownership
                                            </li>
                                            <li>
                                                Ability to juggle many projects and responsibilities
                                            </li>
                                            <li>
                                                Extremely entrepreneurial and self-driven
                                            </li>
                                            <li>
                                                Not afraid of a steep learning curve
                                            </li>
                                            <li>
                                                Passionate about building a big business that transforms the sales industry
                                            </li>
                                            <li>
                                                Thrive in a fast-paced environment
                                            </li>
                                            <li>
                                                Simple designs and fast execution
                                            </li>
                                            <li>
                                                Discipline in following process and documenting your work
                                            </li>
                                        </ul>
                                        <p>
                                            Requirements:
                                        </p>
                                        <ul>
                                            <li>
                                                Candidate must possess at least Bachelor's Degree/Post Graduate Diploma/Professional Degree in any field.
                                            </li>
                                            <li>
                                                Required language(s): Chinese, English
                                            </li>
                                            <li>
                                                At least 2 Year(s) of working experience in the related field is required for this position.
                                            </li>
                                            <li>
                                                Preferably Manager specialized in IT/Computer - Software or equivalent.
                                            </li>
                                            <li>
                                                3 years of project management experience in software development with a team of at least 5 programmers
                                            </li>
                                            <li>
                                                Strong analytical skills and creative problem-solving skills
                                            </li>
                                            <li>
                                                Excellent written and verbal communication skills
                                            </li>
                                            <li>
                                                Strong business acumen, be customer focused, team and results-oriented
                                            </li>
                                        </ul>
                                    </b-card>
                                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('6')" v-b-modal.modal-center-mobile>
                                        Apply Now
                                    </b-button>
                                </b-collapse>
                                <hr>
                            </b-list-group>
                          <b-modal id="modal-center-mobile" size="lg" centered :title="'Apply For ' + form.position" @shown="focusMyElement" hide-footer>

                          <b-alert :show="dismissCountDown"
                                  dismissible
                                  variant="success"
                                  @dismissed="dismissCountDown=0"
                                  @dismiss-count-down="countDownChanged">
                            This alert will dismiss after {{dismissCountDown}} seconds...
                            Successfully Sended!
                          </b-alert>
                          <b-alert :show="dismissCountDown1"
                                  dismissible
                                  variant="danger"
                                  @dismissed="dismissCountDown1=0"
                                  @dismiss-count-down="countDownChanged1">
                            This alert will dismiss after {{dismissCountDown1}} seconds...
                            An error had occured. Please send to hr@poseidon-it.com by your email.
                          </b-alert>
                          <b-form @submit="onSubmit" @reset="onReset" v-if="show" enctype="multipart/form-data">
                            <b-form-group id="exampleInputGroup1"
                                          label="Name:"
                                          label-for="exampleInput1"
                                          label-text-align="left"
                                          :label-cols="4" horizontal >
                                          <b-form-input id="exampleInput1"
                                                        type="text"
                                                        v-model="form.name"
                                                        required
                                                        placeholder="Enter Name" ref="focusThis">
                                          </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup2"
                                          label="NRIC Number:"
                                          label-for="exampleInput2"
                                          label-text-align="left"
                                          :label-cols="4" horizontal>
                                          <b-form-input id="exampleInput2"
                                                        type="number" min="0"
                                                        v-model="form.nric"
                                                        required
                                                        placeholder="Enter NRIC Number">
                                          </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup3"
                                          label="Email Address:"
                                          label-for="exampleInput3"
                                          label-text-align="left"
                                          :label-cols="4" horizontal>
                                          <b-form-input id="exampleInput3"
                                            type="email"
                                            v-model="form.email"
                                            required
                                            placeholder="Enter Email Address">
                              </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup4"
                                          label="Contact Number:"
                                          label-for="exampleInput4"
                                          label-text-align="left"
                                          :label-cols="4" horizontal>
                                          <b-form-input id="exampleInput4"
                                            type="number" min="0"
                                            v-model="form.number"
                                            required
                                            placeholder="Enter Contact Number">
                              </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup5"
                                          label="Job Position:"
                                          label-for="exampleInput5"
                                          label-text-align="left"
                                          :label-cols="4" horizontal>
                              <b-form-select id="exampleInput5"
                                            :options="position"
                                            required
                                            v-model="form.position">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group id="exampleGroup6"
                                          label="Resume:"
                                          label-for="exampleInput6"
                                          label-text-align="left"
                                          :label-cols="4" horizontal>
                              <!-- <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                                <b-form-checkbox value="me">Check me out</b-form-checkbox>
                                <b-form-checkbox value="that">Check that out</b-form-checkbox>
                              </b-form-checkbox-group> -->
                              <b-form-file v-model="file" placeholder="Choose a file..." accept=".pdf, .docx" id="resume_mobile" required v-on:change="handleFileUpload()" name="resume_mobile"></b-form-file>
                              <!-- <div class="mt-3">Selected file: {{file && file.name}}</div> -->
                            </b-form-group>
                            <b-form-group id="exampleGroup6"
                                          label-for="exampleInput6"
                                          label-text-align="left" horizontal style="text-align:left;">
                              <!-- <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                                <b-form-checkbox value="me">Check me out</b-form-checkbox>
                                <b-form-checkbox value="that">Check that out</b-form-checkbox>
                              </b-form-checkbox-group> -->
                              <b-button type="reset" variant="danger" >Reset</b-button>
                              <b-button type="submit" variant="primary" :disabled="submitDisable">{{submitStatus}}</b-button>
                              <!-- <div class="mt-3">Selected file: {{file && file.name}}</div> -->
                            </b-form-group>
                          </b-form>
                        </b-modal>
                        </div>
                    </div>
                </div>
                <div class="join-us">
                    <div class="ViewMore">
                        <span style="font-size:3vw;">View more details</span>
                        <img class="hand" src="../assets/icon/point_right-01.svg"/>
                    </div>
                    <div class="gradient">
                        <div class="join-us-main">
                            <div class="join-us-title">
                                Join Us
                            </div>
                            <img class="ball" src="../assets/icon/element_pink.svg"/>
                            <div class="join-us-description">
                                If you are passionate about technology, we want you to be part of our story!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <div class="third">
        <div class="third-second">
          <div class="ourTeamContent">
            <div class="ourTeamContentHeader">
                <div class="ourTeamContentH1">
                  We are committed to motivate, empower & develop our people to shape talented individuals for the future growth of the company.
                </div>
            </div>
            <div class="ourTeamContentMember scroll">
              <div class="ourTeamContentMemberDiv">
                <div v-for="item in member" :key="item.name" class="ourTeamContentMemberList">
                    <div class="ourTeamContentMemberMemberText">
                      <div class="ourTeamContentMemberImage">
                        <img v-bind:src="item.img"/>
                      </div>
                      <div class="ourTeamContentText">
                        <div style="font-weight:bold;">{{item.position}}</div>
                        <div>{{item.name}}</div>
                      </div>
                    </div>
                    <hr>
                </div>
              </div>
            </div>
          </div>
          <div class="ourTeam">
            <div class="gradientOverlay_second">
                <div class="ViewMore">
                    <img class="hand" src="../assets/icon/point_left-01.svg"/>
                    <span style="font-size:1vw;">View more details</span>
                </div>
              <div class="ourTeamDesc">
                <h1>Our Team
                    <img class="ball" src="../assets/icon/element_blue.svg"/>
                </h1>
                <p>We are committed to motivate, empower & develop our people to shape talented individuals for the future growth of the company.</p>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="third">
        <div class="third-second">
          <div class="joinUs">
            <div class="gradientOverlay_second">
                <div class="ViewMore" style="position:absolute;top:0%;right:0%;margin-top:5%;margin-right:5%;width:100%;text-align:right;">
                    <span style="font-size:1vw;">View more details</span>
                    <img class="hand" src="../assets/icon/point_right-01.svg"/>
                </div>
              <div class="joinUsDesc">
                <h1>Join Us
                    <img class="ball" src="../assets/icon/element_pink.svg"/>
                </h1>
                <div><p>If you are passionate about technology, we want you to be part of our story!<br><br></p></div>
              </div>
            </div>
          </div>
          <div class="joinUsContent">
            <div class="joinUsContentHeader">
                <div class="joinUsContentH1">
                  Send your resume to hr@poseidon-it.com
                </div>
            </div>
            <div class="joinUsContentMember scroll">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse1 v-on:click="toggleDiv('1')">
                  Frontend Engineer
                  <img v-if="collapse1" class="collapse_image" src="../assets/icon/-.svg"/>
                  <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                </b-list-group-item>
                <b-collapse id="collapse1" class="mt-2">
                    <b-card class="joinUsCollapseCard">
                      <p>Job Responsibilities:</p>
                      <ul>
                          <li>Responsible for the production of the web front-end and the company’s internet products</li>
                          <li>Responsible for production of the web front-end and the realization of the effect</li>
                          <li>Apply visual styles and interactions through various emerging technologies, such as ES6, CSS3, etc.</li>
                          <li>Cooperate with designers and developers to adjust, modify and optimize pages according to requirements.</li>
                      </ul>

                      <p>Requirements:</p>
                      <ul>
                          <li>Bachelor's Degree in Computer Science / Computer Engineering</li>
                          <li>Min 2 years of front-end or web application development experience</li>
                          <li>Proficient in HTML5, CSS3 (e.g. Sass) and Javascripts (e.g. ES6)</li>
                          <li>Proficient in front End development using VueJS</li>
                          <li>Experience with front-end Test Driven Development and Continuous Integration</li>
                          <li>Experience of D3.js or related web data visualisation tools</li>
                          <li>Experience with web responsive design and implementation and handling cross browser compatibility</li>
                          <li><span class="joinUsBold">For Junior</span>, minimum 1-2 years of working experience in the related field, fresh graduates are encouraged to apply.</li>
                          <li><span class="joinUsBold">Required language</span>: Chinese & English (Speak & Write)</li>
                      </ul>
                      <p>Benefits:</p>
                      <ul>
                          <li>EPF & SOCSO</li>
                          <li>Medical Claim, dental claim available</li>
                          <li>Year End bonus after working for a full year</li>
                          <li>Increment based on performance</li>
                      </ul>
                    </b-card>
                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('1')" v-b-modal.modal-center>Apply Now</b-button>
                </b-collapse>
                <hr>
                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse2 v-on:click="toggleDiv('2')">
                  Senior PHP Developer
                  <img v-if="collapse2" class="collapse_image" src="../assets/icon/-.svg"/>
                  <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                </b-list-group-item>
                <b-collapse id="collapse2" class="mt-2">
                    <b-card class="joinUsCollapseCard">
                      <p>Job Responsibilities:</p>
                      <ul>
                          <li>Develop, Customize, Enhance developed web application in PHP.</li>
                          <li>Integration of user-facing elements developed by front-end developers.</li>
                          <li>Build efficient, testable, and reusable PHP modules.</li>
                          <li>Solve complex performance problems and architectural challenges</li>
                          <li>Create and implement a robust set of services and APls to power web applications.</li>
                      </ul>
                      <p>Requirements:</p>
                      <ul>
                          <li>At least a Bachelor’s Degree in Information Technology or Computer Science or relevant field.</li>
                          <li>Required skills: HTML5, PHP (laravel framework), JQuery, MS SQL, MYSQL, JavaScript, JSON, AJAX etc.</li>
                          <li>Strong analytical skill and good problem solving skill.</li>
                          <li>Able to work as team player to achieve assigned task within the deadline.</li>
                          <li>Matured personality and able to work independently as well as in a team with a can-do working attitude.</li>
                          <li>Preferably 2 years of working experience in the related field</li>
                          <li>Experience in e-commerce, web applications, system development, e-Security industries gives as advantage.</li>
                          <li>Fresh graduates are encouraged to apply.</li>
                      </ul>
                      <p>Benefits:</p>
                      <ul>
                          <li>EPF & SOCSO</li>
                          <li>Medical Claim, dental claim available</li>
                          <li>Year End bonus after working for a full year</li>
                          <li>Increment based on performance</li>
                      </ul>
                    </b-card>
                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('2')" v-b-modal.modal-center>Apply Now</b-button>
                </b-collapse>
                <hr>
                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse3 v-on:click="toggleDiv('3')">
                  Web Master
                  <img v-if="collapse3" class="collapse_image" src="../assets/icon/-.svg"/>
                  <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                </b-list-group-item>
                <b-collapse id="collapse3" class="mt-2">
                    <b-card class="joinUsCollapseCard">
                      <p>Job Responsibilities:</p>
                      <ul>
                          <li>Create and upload copy and image for the blogs and forums</li>
                          <li>Conduct keyword research and web statistics reporting</li>
                          <li>Contribute to company and industry blogs and manage e-communications</li>
                          <li>Keep up to date with current digital trends</li>
                          <li>Research new online media opportunities that may benefit the business including mobile, social media, development of blogs and forums</li>
                      </ul>
                      <p>Requirements:</p>
                      <ul>
                          <li>Candidate must possess at least Diploma/Advanced/Higher/Graduate Diploma, Bachelor's Degree/Post Graduate Diploma/Professional Degree in Engineering (Computer/Telecommunication), Computer Science/Information Technology or equivalent.</li>
                          <li>At least 1 year working experience in the related field is required for this position. Fresh graduates are also welcome.</li>
                          <li>Preferably Junior Executive specialized in IT/Computer - Network/System/Database Admin or equivalent.</li>
                          <li>The ability to work independently and flexibly.</li>
                          <li>The capacity to prioritise and work across multiple projects.</li>
                          <li>The ability to work as part of a team.</li>
                          <li>Creative skills for contributing new and innovative ideas.</li>
                          <li>Networking and analytical skills.</li>
                          <li>Knowledge of existing and emerging social media platforms.</li>
                          <li>Excellent IT skills.</li>
                          <li>Familiar Window and Linux system.</li>
                      </ul>
                      <p>Benefits:</p>
                      <ul>
                          <li>EPF & SOCSO</li>
                          <li>Medical Claim, Dental Claim and Optical Claim available</li>
                          <li>Year-end bonus after working for a full year</li>
                          <li>Increment based on performance</li>
                      </ul>

                    </b-card>
                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('3')" v-b-modal.modal-center>Apply Now</b-button>
                </b-collapse>
                <hr>
                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse4 v-on:click="toggleDiv('4')">
                  Technical Support
                  <img v-if="collapse4" class="collapse_image" src="../assets/icon/-.svg"/>
                  <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                </b-list-group-item>
                <b-collapse id="collapse4" class="mt-2">
                    <b-card class="joinUsCollapseCard">
                      <p>Job Responsibilities:</p>
                      <ul>
                          <li>You will provide advice and assistance to users on the usage of simple functional features of application</li>
                          <li>You will be responsible for performing first level troubleshooting support for problems related to application systems</li>
                          <li>This role is primarily phone and internet-based and you must be comfortable with cold-calling, social selling and work with customers to understand and meet their needs to achieving and ambitious individuals who wish to launch successful careers in enterprise technology sales.</li>
                          <li>Research prospective customers to problem solve challenges and recommend products of company</li>
                          <li>Promote company online games across Asia Region</li>
                          <li>Supporting clients after sale, identify and handle customer inquiries completely and accurately to the satisfaction of the customer.</li>
                      </ul>
                      <p>Requirements:</p>
                      <ul >
                          <li>Diploma or IT Certificate in Computer Science, any IT Discipline or equivalent, and Marketing.</li>
                          <li>Details knowledge and experience in coordinating with different clients to provide technical support, investigate and fix issues on client’s system during integration phase.</li>
                          <li>Must be able to speak English & Mandarin to ensure smooth communication with end-user support.</li>
                          <li>Candidates have at least 1 to 2 years working experience in relevant field will be an added advantage</li>
                          <li>Able to work on Weekend and Public Holiday</li>
                          <li>Rotating Shift</li>
                          <li>Able to speak and write Chinese and English</li>
                          <li>Fresh graduates are encouraged to apply.</li>
                      </ul>

                      <p>Benefits:</p>
                      <ul>
                          <li>EPF & SOCSO</li>
                          <li>Medical Claim, Dental Claim and Optical Claim available</li>
                          <li>Year-end bonus after working for a full year</li>
                          <li>Increment based on performance</li>
                      </ul>
                    </b-card>
                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('4')" v-b-modal.modal-center>Apply Now</b-button>
                </b-collapse>
                <hr>
                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse5 v-on:click="toggleDiv('5')">
                  Article Editor
                  <img v-if="collapse5" class="collapse_image" src="../assets/icon/-.svg"/>
                  <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                </b-list-group-item>
                <b-collapse id="collapse5" class="mt-2">
                    <b-card class="joinUsCollapseCard">
                      <p>Job Responsibilities:</p>
                      <ul>
                          <li>Writing/ posting research articles on the website &corporate social media</li>
                          <li>Creating content for our social media platforms</li>
                          <li>Familiar with SEO best practices and generate traffic to website and social media</li>
                          <li>Excellent verbal and written communication skill</li>
                          <li>Preferable person who is sensitive to social media trends. Help to enhance and Improve organic traffic performance via difference channels</li>
                          <li>Actively manage and promote our blog, and pitch articles to relevant third party platforms</li>
                          <li>Regularly produce various content types including email, social media posts, blogs and white papers</li>
                          <li>Analyze content marketing metrics and makes changes as needed</li>
                          <li>Collaborate with internal team and agency to manage/ plan social media marketing platform</li>
                      </ul>
                      <p>Requirements:</p>
                      <ul>
                          <li>Candidate must possess at least Diploma/Advanced/Higher/Graduate Diploma in Engineering (Computer/Telecommunication), Computer Science/Information Technology, Marketing, Journalism, Linguistics/Languages or equivalent</li>
                          <li>Required language(s): Chinese, English</li>
                          <li>Effective verbal and written communication in both English and Chinese</li>
                          <li>Good understanding of Google SEO</li>
                          <li>At least 1 year working experience in the related field is required for this position. Fresh graduates are also welcome</li>
                          <li>Able to work efficiently with ability to multitask and deliver quality content with little supervision</li>
                          <li>Past experience with online community management, copywriting, and/or blogging will be advantageous</li>
                          <li>Required skill(s): Creative writing, Microsoft Office, Digital Marketing, Social Media Management</li>
                      </ul>
                      <p>Benefits:</p>
                      <ul>
                          <li>EPF & SOCSO</li>
                          <li>Medical Claim, Dental Claim and Optical Claim available</li>
                          <li>Year-end bonus after working for a full year</li>
                          <li>Increment based on performance</li>
                      </ul>
                    </b-card>
                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('5')" v-b-modal.modal-center>Apply Now</b-button>
                </b-collapse>
                <hr>
                <b-list-group-item class="d-flex justify-content-between align-items-center joinUsListGroup" v-b-toggle.collapse6 v-on:click="toggleDiv('6')">
                  Product Manager
                  <img v-if="collapse6" class="collapse_image" src="../assets/icon/-.svg"/>
                  <img v-else class="collapse_image" src="../assets/icon/+.svg"/>
                </b-list-group-item>
                <b-collapse id="collapse6" class="mt-2">
                    <b-card class="joinUsCollapseCard">
                      <p>The Responsibilities:</p>
                      <p class="sentence">Product Managers at Poseidon IT Solution focus on identifying our customers and business problems and are at the intersection of business, design, and engineering. You need to be technical enough to understand how our underlying products are built and have a keen eye for design. You are master communicators that work to bring teams together to drive towards a singular goal of making a product successful. Finally, you are disciplined and understand that product management is both an art and a science.</p>
                      <p class="sentence">In this role, you will be open to a healthy dose of creativity to define a vision for the product and be responsible for the strategy, roadmap, and feature definition of a product. You will be the leader at the forefront as this role would require strong collaboration across a various team and be the focal point for all stakeholders nearly in all functions.</p>
                      <p class="sentence">If you join us, you will learn a lot: In terms of technical ability there are many cool tools, technologies, patterns and other great developers that will sharpen your skills. Personally you be given the chance to step up, lead and make your mark in a growing startup as we tackle the challenges in our next phase of growth.</p>
                      <p>We want team members with attributes like:</p>
                      <ul>
                          <li>Focus on delivering value to the customer</li>
                          <li>Strong belief in collaboration</li>
                          <li>Passion that drives you to execute and innovate</li>
                          <li>Ability to self-manage and take ownership</li>
                          <li>Ability to juggle many projects and responsibilities</li>
                          <li>Extremely entrepreneurial and self-driven</li>
                          <li>Not afraid of a steep learning curve</li>
                          <li>Passionate about building a big business that transforms the sales industry</li>
                          <li>Thrive in a fast-paced environment</li>
                          <li>Simple designs and fast execution</li>
                          <li>Discipline in following process and documenting your work</li>
                      </ul>
                      <p>Requirements:</p>
                      <ul>
                          <li>Candidate must possess at least Bachelor's Degree/Post Graduate Diploma/Professional Degree in any field.</li>
                          <li>Required language(s): Chinese, English</li>
                          <li>At least 2 Year(s) of working experience in the related field is required for this position.</li>
                          <li>Preferably Manager specialized in IT/Computer - Software or equivalent.</li>
                          <li>3 years of project management experience in software development with a team of at least 5 programmers</li>
                          <li>Strong analytical skills and creative problem-solving skills</li>
                          <li>Excellent written and verbal communication skills</li>
                          <li>Strong business acumen, be customer focused, team and results-oriented</li>
                      </ul>
                    </b-card>
                    <b-button variant="outline-primary" class="joinUsApplyNow" size="lg" v-on:click="positionn('6')" v-b-modal.modal-center>Apply Now</b-button>
                </b-collapse>
                <hr>
              </b-list-group>
              <b-modal id="modal-center" size="lg" centered :title="'Apply For ' + form.position" @shown="focusMyElement" hide-footer>
                  <b-alert :show="dismissCountDown"
                          dismissible
                          variant="success"
                          @dismissed="dismissCountDown=0"
                          @dismiss-count-down="countDownChanged">
                    This alert will dismiss after {{dismissCountDown}} seconds...
                    Successfully Sended!
                  </b-alert>
                  <b-alert :show="dismissCountDown1"
                          dismissible
                          variant="danger"
                          @dismissed="dismissCountDown1=0"
                          @dismiss-count-down="countDownChanged1">
                    This alert will dismiss after {{dismissCountDown1}} seconds...
                    An error had occured. Please send to hr@poseidon-it.com by your email.
                  </b-alert>
                  <b-form @submit="onSubmit" @reset="onReset" v-if="show" enctype="multipart/form-data">
                    <b-form-group id="exampleInputGroup1"
                                  label="Name:"
                                  label-for="exampleInput1"
                                  label-text-align="right"
                                  :label-cols="4" horizontal >
                                  <b-form-input id="exampleInput1"
                                                type="text"
                                                v-model="form.name"
                                                required
                                                placeholder="Enter Name" ref="focusThis">
                                  </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup2"
                                  label="NRIC Number:"
                                  label-for="exampleInput2"
                                  label-text-align="right"
                                  :label-cols="4" horizontal>
                                  <b-form-input id="exampleInput2"
                                                type="number" min="0"
                                                v-model="form.nric"
                                                required
                                                placeholder="Enter NRIC Number">
                                  </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup3"
                                  label="Email Address:"
                                  label-for="exampleInput3"
                                  label-text-align="right"
                                  :label-cols="4" horizontal>
                                  <b-form-input id="exampleInput3"
                                    type="email"
                                    v-model="form.email"
                                    required
                                    placeholder="Enter Email Address">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup4"
                                  label="Contact Number:"
                                  label-for="exampleInput4"
                                  label-text-align="right"
                                  :label-cols="4" horizontal>
                                  <b-form-input id="exampleInput4"
                                    type="number" min="0"
                                    v-model="form.number"
                                    required
                                    placeholder="Enter Contact Number">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup5"
                                  label="Job Position:"
                                  label-for="exampleInput5"
                                  label-text-align="right"
                                  :label-cols="4" horizontal>
                      <b-form-select id="exampleInput5"
                                    :options="position"
                                    required
                                    v-model="form.position">
                      </b-form-select>
                    </b-form-group>
                    <b-form-group id="exampleGroup6"
                                  label="Resume:"
                                  label-for="exampleInput6"
                                  label-text-align="right"
                                  :label-cols="4" horizontal>
                    <b-form-file v-model="file" placeholder="Choose a file..." accept=".pdf, .docx" id="resume" required v-on:change="handleFileUpload()" name="resume"></b-form-file>
                    </b-form-group>
                    <b-form-group id="exampleGroup6"
                                  label-for="exampleInput6"
                                  label-text-align="right" horizontal style="text-align:right;">
                      <b-button type="reset" variant="danger">Reset</b-button>
                      <b-button type="submit" variant="primary" :disabled="submitDisable">{{submitStatus}}</b-button>
                    </b-form-group>
                  </b-form>
                </b-modal>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import Lottie from '../lottie.vue';
  import * as animationData from '../assets/data.json';
  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      'lottie': Lottie,
    },
    computed: {

    },
    data() {
      return {
        dismissCountDown: 0,
        dismissCountDown1: 0,
        showAlert:null,
        file:'',
        submitStatus:'Submit',
        submitDisable:false,
        form: {
          name: '',
          nric: '',
          email: '',
          number: '',
          position: ''
        },
        position: [
          'Frontend Engineer', 'Senior PHP Developer', 'Web Master', 'Technical Support', 'Article Editor', 'Product Manager'
        ],
        show: true,
        collapse1:false,
        collapse2:false,
        collapse3:false,
        collapse4:false,
        collapse5:false,
        collapse6:false,
        defaultOptions: {animationData: animationData,loop:false,autoplay:true},
        member:[
          {name:'Phanie Moh',position:'Finance',img:'../static/assets/image/company_photo/phannie.png'},
          {name:'Sherrine Cheng',position:'HR & Admin',img:'../static/assets/image/company_photo/sherrine.png'},
          {name:'Brian Liang',position:'Account Manager',img:'../static/assets/image/company_photo/brian.png'},
          {name:'How Chin Yang',position:'Development Team Lead',img:'../static/assets/image/company_photo/yang.png'},
          {name:'Sean Wong',position:'Frontend Developer',img:'../static/assets/image/company_photo/sean.png'},
          {name:'Lim Shuang Yee',position:'Backend Developer',img:'../static/assets/image/company_photo/shuangyee.jpg'},
          {name:'Kelvin Tam',position:'Senior Android & iOS developer',img:'../static/assets/image/company_photo/kelvin.jpg'},
          {name:'Soo Ee Chua',position:'Graphic / UI / UX Designer',img:'../static/assets/image/company_photo/sooee.png'},
          {name:'Zeety Chia',position:'QA',img:'../static/assets/image/company_photo/zhuoting.jpg'},
        ]
      }
    },
    mounted(){

    },
    methods: {
        handleHref(){
            var current=document.documentElement.scrollTop;
            var positionY = document.getElementById('particles-js').offsetHeight;
            positionY-=current;
            window.scrollBy({
              top: positionY,
              behavior: "smooth"
            });
        },
        toggleDiv: function(num) {
            if(num =='1')
            {
              this.collapse1 = !this.collapse1;
            }
            else if(num =='2')
            {
              this.collapse2 = !this.collapse2;
            }
            else if(num =='3')
            {
              this.collapse3 = !this.collapse3;
            }
            else if(num =='4')
            {
              this.collapse4 = !this.collapse4;
            }
            else if(num =='5')
            {
              this.collapse5 = !this.collapse5;
            }
            else if(num =='6')
            {
              this.collapse6 = !this.collapse6;
            }
        },
        positionn: function(num) {
            if(num =='1')            this.form.position = 'Frontend Engineer';
            else if(num =='2')              this.form.position = 'Senior PHP Developer';
            else if(num =='3')              this.form.position = 'Web Master';
            else if(num =='4')              this.form.position = 'Technical Support';
            else if(num =='5')              this.form.position = 'Article Editor';
            else if(num =='6')              this.form.position = 'Product Manager';
        },
        focusMyElement (e) {
          this.$refs.focusThis.focus()
        },
        onSubmit (evt) {
          evt.preventDefault();
          this.submitStatus="Submitting..."

          this.submitDisable=true;

          let formData = new FormData();
          formData.append('data', this.file);
          formData.append('name',this.form.name);
          formData.append('nric',this.form.nric);
          formData.append('email',this.form.email);
          formData.append('number',this.form.number);
          formData.append('position',this.form.position);

          const config = {
              headers: { "Content-Type": "multipart/form-data"}
          }

          if(this.file.size >= 2200000)
          {
            alert('Make sure the file size is less than 2MB.');
            this.submitStatus="Submit"
            this.submitDisable=false;
          }else{
            axios.post('/sendmail.php', formData, config).then( (response) => {
                this.submitStatus="Submitted"
                this.dismissCountDown = 3;

                setTimeout(function(){
                window.location.reload();
                }, 4000);

            })
            .catch((error) => {
                //console.log(error);
                this.submitStatus="Submit"
                this.submitDisable=false;
                this.dismissCountDown1 = 3;
            });
          }
        },
        onReset (evt) {
          evt.preventDefault();
          this.form.email = '';
          this.form.name = '';
          this.form.nric = '';
          this.form.number = '';
          this.form.checked = [];
          this.show = false;
          this.$nextTick(() => { this.show = true });
        },
        handleFileUpload(){

        },
        countDownChanged (dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        countDownChanged1 (dismissCountDown) {
            this.dismissCountDown1 = dismissCountDown
        },
    },
    mounted(){
      this.$nextTick(() =>{
        var ourteam = true;
        var joinus = true;

        $('.our-team').click(function()
        {
            $('.our-team').animate(
            {
                right:'-100%',
            },500);

            $('.our-team-content').animate(
            {
                right:'0%',
            },500);
        });

        $('.button-close-1').click(function()
        {
            $('.our-team').animate(
            {
                right:'0%',
            },500);

            $('.our-team-content').animate(
            {
                right:'100%',
            },500);
        });

        $('.join-us').click(function()
        {
            $('.join-us').animate(
            {
                right:'100%',
            },500);

            $('.join-us-content').animate(
            {
                right:'0%',
            },500);
        });

        $('.button-close-2').click(function()
        {
            $('.join-us').animate(
            {
                right:'0%',
            },500);

            $('.join-us-content').animate(
            {
                right:'-100%',
            },500);
        });

        $(function()
        {
            $(window).scroll(function()
            {
                var window_h=$(window).scrollTop();
                var window_inner_height=window.innerHeight;

                if((window_inner_height+1)>window_inner_height)
                {
                    $("#img2").addClass("animated fadeInUp1").show();
                    $("#img1").addClass("animated fadeInUp2").show();
                }
            });
        });

        window.onbeforeunload=function()
        {
            window.scrollTo(0,0);
        }
      });
    }
  }
</script>
<style lang="scss" type="text/css">
    @import "../style/index.scss";
</style>