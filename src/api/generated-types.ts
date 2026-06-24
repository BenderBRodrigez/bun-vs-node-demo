/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ReviewDimension */
export enum ReviewDimension {
  Specificity = "specificity",
  Pragmatism = "pragmatism",
  Empathy = "empathy",
  Clarity = "clarity",
}

/** InterviewStatus */
export enum InterviewStatus {
  InProgress = "in_progress",
  Completed = "completed",
}

/** Body_answer_interview_question_api_interview__interview_id__answer__question_id__post */
export interface BodyAnswerInterviewQuestionApiInterviewInterviewIdAnswerQuestionIdPost {
  /** Audio */
  audio: File | Blob;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** InterviewCreate */
export interface InterviewCreate {
  /**
   * Vacancy Id
   * @format uuid
   */
  vacancy_id: string;
  /** Name */
  name: string;
  /**
   * Email
   * @format email
   */
  email: string;
}

/** InterviewPublic */
export interface InterviewPublic {
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Username
   * @minLength 3
   */
  username: string;
  /**
   * Email
   * @format email
   * @minLength 3
   * @maxLength 50
   */
  email: string;
  /** @default "in_progress" */
  status?: InterviewStatus;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Questions */
  questions?: InterviewQuestionPublic[] | null;
  /** Reviews */
  reviews?: ReviewPublic[] | null;
}

/** InterviewQuestionPublic */
export interface InterviewQuestionPublic {
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Number
   * @min 0
   */
  number: number;
  /**
   * Attempt
   * @min 0
   */
  attempt: number;
  /**
   * Text
   * @minLength 1
   */
  text: string;
  /** Answer Score S */
  answer_score_s?: number | null;
  /** Answer Score P */
  answer_score_p?: number | null;
  /** Answer Transcription */
  answer_transcription?: string | null;
  /** Answer Audio */
  answer_audio?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** ReviewPublic */
export interface ReviewPublic {
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  dimension: ReviewDimension;
  /**
   * Score
   * @min 0
   */
  score: number;
  /**
   * Rating
   * @minLength 1
   */
  rating: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
}

/** VacancyPublic */
export interface VacancyPublic {
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Title
   * @minLength 1
   */
  title: string;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Question Count */
  question_count: number;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
  /** Input */
  input?: any;
  /** Context */
  ctx?: object;
}
