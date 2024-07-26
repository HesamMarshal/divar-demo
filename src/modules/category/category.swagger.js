/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              requiered:
 *                  - name
 *                  - icon
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 */

/**
 * @swagger
 * /category/:
 *  post:
 *      summary: Create new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 */

/**
 * @swagger
 * /category/:
 *  get:
 *      summary: Get All categories
 *      tags:
 *          -   Category
 *      response:
 *          200:
 *              description: success
 */
