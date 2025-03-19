// Types for frontend components (in JSDoc format)

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} [firstName]
 * @property {string} [lastName]
 * @property {string} [email]
 * @property {boolean} [isAdmin]
 */

/**
 * @typedef {Object} FileMetadata
 * @property {Object} [period]
 * @property {string} [period.startDate]
 * @property {string} [period.endDate]
 * @property {string} [spatialDomain]
 * @property {Object} [dataAttributes]
 */

/**
 * @typedef {Object} File
 * @property {number} id
 * @property {string} fileName
 * @property {number} fileSize
 * @property {string} fileType
 * @property {string} fileHash
 * @property {(User|number)} uploadedBy
 * @property {number} downloadCount
 * @property {FileMetadata} [metadata]
 * @property {(string|Date)} createdAt
 */

/**
 * @typedef {Object} DownloadHistory
 * @property {number} id
 * @property {number} fileId
 * @property {number} userId
 * @property {(string|Date)} downloadedAt
 * @property {File} [file]
 * @property {User} [user]
 */

/**
 * @typedef {File} DuplicateFile
 * @property {number} [similarityScore]
 * @property {string[]} [similarityReason]
 */

/**
 * @typedef {File} MetadataSimilarFile
 * @property {number} [similarityScore]
 * @property {string[]} [metadataMatches]
 */

/**
 * @typedef {Object} DuplicateCheckResult
 * @property {File[]} exact
 * @property {DuplicateFile[]} similar
 * @property {MetadataSimilarFile[]} similarByMetadata
 */

/**
 * @typedef {Object} FileUploadResult
 * @property {string} message
 * @property {File} file
 * @property {File[]|null} similarFiles
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token
 * @property {User} user
 */

// Export empty object to make this a proper module
export {};